#!/usr/bin/env node
/**
 * Downloads audio from a YouTube playlist with yt-dlp and writes a commit-safe JSON
 * manifest. Audio binaries are stored under public/assets/audio/ and are gitignored.
 *
 * Prerequisites (macOS):
 *   brew install yt-dlp ffmpeg
 *
 * Usage:
 *   npm run audio:download:kashf
 *   node scripts/download-playlist-audio.mjs [playlistIdOrUrl]
 *
 * Notes:
 *   - Confirm you own / have rights to the playlist content before downloading.
 *   - Audio files stay local; GitHub Pages deploy does not ship them.
 *   - Later: upload .m4a files to Firebase Storage for production playback.
 */
import { spawnSync } from 'node:child_process';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const DEFAULT_PLAYLIST_ID = 'PLQBBxQH_3LcPqJoZzvS3zvYlCAjTY41PY';
const SERIES_ID = 'kashf-al-mahjub';
const SERIES_TITLE_EN = 'Kashaf ul Mahjoob — Complete Bayan';
const SERIES_TITLE_UR = 'کشف المحجوب — مکمل بیان';
const AUDIO_BITRATE = '64k';

function resolvePlaylistId(arg) {
  if (!arg) return DEFAULT_PLAYLIST_ID;
  const m = String(arg).match(/[?&]list=([A-Za-z0-9_-]+)/);
  if (m) return m[1];
  if (/^PL[A-Za-z0-9_-]+$/.test(arg)) return arg;
  throw new Error(`Unrecognized playlist argument: ${arg}`);
}

function requireTool(name, args = ['--version']) {
  const result = spawnSync(name, args, { encoding: 'utf8' });
  if (result.error || result.status !== 0) {
    console.error(`Missing required tool: ${name}`);
    console.error('Install with: brew install yt-dlp ffmpeg');
    process.exit(1);
  }
  return (result.stdout || result.stderr || '').trim().split('\n')[0];
}

function runYtDlp(args, { inherit = false } = {}) {
  const result = spawnSync('yt-dlp', args, {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'],
  });
  if (result.status !== 0 && !inherit) {
    const err = (result.stderr || result.stdout || '').trim();
    throw new Error(`yt-dlp failed (${result.status}): ${err || 'unknown error'}`);
  }
  if (inherit && result.status !== 0) {
    throw new Error(`yt-dlp failed with exit code ${result.status}`);
  }
  return result.stdout ?? '';
}

function pad3(n) {
  return String(n).padStart(3, '0');
}

function relativeFromRoot(absPath) {
  return relative(ROOT, absPath).split('\\').join('/');
}

function parseMetaLines(stdout) {
  const episodes = [];
  for (const line of stdout.split('\n').map((l) => l.trim()).filter(Boolean)) {
    // Fields separated by a rare delimiter so titles can contain |
    const parts = line.split('\t');
    if (parts.length < 5) continue;
    const [indexRaw, id, title, durationRaw, uploadDate] = parts;
    const index = Number(indexRaw);
    if (!Number.isFinite(index) || index < 1 || !id) continue;
    const duration = Number(durationRaw);
    episodes.push({
      episode: index,
      youtubeId: id,
      title: title || id,
      durationSec: Number.isFinite(duration) ? Math.round(duration) : null,
      uploadDate: uploadDate && uploadDate !== 'NA' ? uploadDate : '',
    });
  }
  return episodes.sort((a, b) => a.episode - b.episode);
}

function toPublishedAt(uploadDate) {
  if (!uploadDate || !/^\d{8}$/.test(uploadDate)) return '';
  return `${uploadDate.slice(0, 4)}-${uploadDate.slice(4, 6)}-${uploadDate.slice(6, 8)}T00:00:00+00:00`;
}

async function main() {
  const playlistId = resolvePlaylistId(process.argv[2]);
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
  const outDir = join(ROOT, 'public', 'assets', 'audio', SERIES_ID);
  const manifestPath = join(ROOT, 'public', 'assets', 'audio', `${SERIES_ID}.json`);

  const ytVersion = requireTool('yt-dlp');
  const ffVersion = requireTool('ffmpeg', ['-version']);
  console.log(`yt-dlp: ${ytVersion}`);
  console.log(`ffmpeg: ${ffVersion}`);
  console.log(`Playlist: ${playlistUrl}`);
  console.log(`Output:  ${relativeFromRoot(outDir)}/`);

  await mkdir(outDir, { recursive: true });

  const metaStdout = runYtDlp([
    '--flat-playlist',
    '--print',
    '%(playlist_index)s\t%(id)s\t%(title)s\t%(duration)s\t%(upload_date|NA)s',
    playlistUrl,
  ]);
  const episodeMeta = parseMetaLines(metaStdout);
  if (episodeMeta.length === 0) {
    throw new Error('Playlist contained no entries');
  }
  console.log(`Found ${episodeMeta.length} episode(s). Downloading audio…`);

  const outputTemplate = join(outDir, '%(playlist_index)03d-%(id)s.%(ext)s');
  runYtDlp(
    [
      '-x',
      '--audio-format',
      'm4a',
      '--audio-quality',
      AUDIO_BITRATE,
      '--no-overwrites',
      '--continue',
      '--ignore-errors',
      '--no-write-playlist-metafiles',
      '-o',
      outputTemplate,
      playlistUrl,
    ],
    { inherit: true },
  );

  const files = await readdir(outDir);
  const audioFiles = files.filter((f) => /\.(m4a|mp3|opus|webm|m4b)$/i.test(f));

  const episodes = [];
  for (const meta of episodeMeta) {
    const expected = `${pad3(meta.episode)}-${meta.youtubeId}.`;
    let file = audioFiles.find((f) => f.startsWith(expected));
    if (!file) {
      file = audioFiles.find((f) => f.includes(`-${meta.youtubeId}.`));
    }
    if (!file) {
      console.warn(`Missing audio file for episode ${meta.episode} (${meta.youtubeId})`);
      continue;
    }

    episodes.push({
      episode: meta.episode,
      youtubeId: meta.youtubeId,
      title: meta.title,
      durationSec: meta.durationSec,
      publishedAt: toPublishedAt(meta.uploadDate),
      file: relativeFromRoot(join(outDir, file)),
    });
  }

  if (episodes.length === 0) {
    throw new Error('No audio episodes were downloaded. Check yt-dlp output above.');
  }

  if (episodes.length !== episodeMeta.length) {
    console.warn(
      `Warning: playlist has ${episodeMeta.length} entries but only ${episodes.length} audio files were produced.`,
    );
  }

  const manifest = {
    id: SERIES_ID,
    titleEn: SERIES_TITLE_EN,
    titleUr: SERIES_TITLE_UR,
    playlistId,
    sourceUrl: playlistUrl,
    downloadedAt: new Date().toISOString(),
    episodeCount: episodes.length,
    episodes,
  };

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Wrote ${episodes.length} episode(s)`);
  console.log(`Manifest: ${relativeFromRoot(manifestPath)}`);
  console.log('Done. Audio binaries are gitignored; commit the manifest only.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
