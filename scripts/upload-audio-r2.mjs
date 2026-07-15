#!/usr/bin/env node
/**
 * Upload local audio episodes to Cloudflare R2 and patch the series manifest with audioUrl.
 *
 * Prerequisites:
 *   1. Copy .env.r2.example → .env.r2 and fill in credentials
 *   2. Enable public r2.dev access on the bucket and set R2_PUBLIC_BASE_URL
 *   3. npm run audio:download:kashf  (local .m4a files)
 *
 * Usage:
 *   npm run audio:upload:r2
 *   npm run audio:upload:r2 -- kashf-al-mahjub
 */
import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

async function loadEnvFile(path) {
  try {
    const text = await readFile(path, 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!(key in process.env) || !process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // optional file
  }
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Missing ${name}. Set it in .env.r2`);
    process.exit(1);
  }
  return value;
}

function r2KeyFromLocalFile(localFile) {
  // public/assets/audio/kashf-al-mahjub/001-id.m4a → audio/kashf-al-mahjub/001-id.m4a
  const normalized = localFile.replace(/\\/g, '/');
  const marker = '/assets/audio/';
  const idx = normalized.indexOf(marker);
  if (idx === -1) {
    return normalized.replace(/^public\//, '');
  }
  return `audio/${normalized.slice(idx + marker.length)}`;
}

async function main() {
  await loadEnvFile(join(ROOT, '.env.r2'));

  const accountId = requireEnv('R2_ACCOUNT_ID');
  const bucket = requireEnv('R2_BUCKET_NAME');
  const accessKeyId = requireEnv('R2_ACCESS_KEY_ID');
  const secretAccessKey = requireEnv('R2_SECRET_ACCESS_KEY');
  const endpoint = process.env.R2_ENDPOINT?.trim() || `https://${accountId}.r2.cloudflarestorage.com`;
  const publicBase = process.env.R2_PUBLIC_BASE_URL?.trim().replace(/\/$/, '') || '';
  if (!publicBase) {
    console.warn('R2_PUBLIC_BASE_URL not set — files will upload but audioUrl will be omitted.');
    console.warn('Enable r2.dev public access on the bucket, add the URL to .env.r2, then re-run.');
  }

  const seriesId = process.argv[2] || 'kashf-al-mahjub';
  const manifestPath = join(ROOT, 'public', 'assets', 'audio', `${seriesId}.json`);
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

  const client = new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });

  console.log(`Bucket: ${bucket}`);
  console.log(`Uploading ${manifest.episodes.length} episode(s)…`);

  let uploaded = 0;
  let skipped = 0;

  for (const episode of manifest.episodes) {
    const localPath = join(ROOT, episode.file);
    const key = r2KeyFromLocalFile(episode.file);
    episode.r2Key = key;
    const audioUrl = publicBase ? `${publicBase}/${key}` : undefined;

    let localSize = 0;
    try {
      localSize = (await stat(localPath)).size;
    } catch {
      console.warn(`Skip episode ${episode.episode}: missing ${episode.file}`);
      continue;
    }

    try {
      const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
      if (head.ContentLength === localSize) {
        if (audioUrl) episode.audioUrl = audioUrl;
        skipped++;
        continue;
      }
    } catch {
      // not uploaded yet
    }

    const body = createReadStream(localPath);
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: 'audio/mp4',
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
    if (audioUrl) episode.audioUrl = audioUrl;
    uploaded++;
    console.log(`  ✓ ${key}`);
  }

  manifest.uploadedAt = new Date().toISOString();
  if (publicBase) {
    manifest.r2PublicBaseUrl = publicBase;
  }
  await import('node:fs/promises').then(({ writeFile }) =>
    writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n'),
  );

  console.log(`Done. Uploaded: ${uploaded}, skipped (unchanged): ${skipped}`);
  console.log(`Manifest updated: public/assets/audio/${seriesId}.json`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
