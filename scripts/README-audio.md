# Playlist audio downloads

Download sermon/bayan audio from YouTube playlists into this project for local use.

## Prerequisites (macOS)

```bash
brew install yt-dlp ffmpeg
```

Confirm you own the content or have permission to download it.

## Kashaf ul Mahjoob

```bash
npm run audio:download:kashf
```

This writes:

- `public/assets/audio/kashf-al-mahjub/*.m4a` — audio files (**gitignored**)
- `public/assets/audio/kashf-al-mahjub.json` — episode manifest (**committed**)

Audio is compressed to about 64 kbps AAC (`.m4a`) for speech.

## Cloudflare R2 (production streaming)

1. Copy `.env.r2.example` → `.env.r2` and fill in credentials (never commit `.env.r2`).
2. Enable **public r2.dev access** on the `al-nisar-audio` bucket in Cloudflare.
3. Set `R2_PUBLIC_BASE_URL` in `.env.r2` (e.g. `https://pub-xxxx.r2.dev`).
4. Upload episodes:

```bash
npm run audio:upload:r2
```

The upload script patches `kashf-al-mahjub.json` with `r2Key` and `audioUrl` per episode.

Set the same public URL in `src/app/data/audio.config.ts` (`r2PublicBaseUrl`) before deploying.

## Important

- `.m4a` binaries are **not** committed and are **not** deployed by GitHub Pages.
- The `/listen` page streams from R2 public URLs in production; locally it falls back to files under `public/assets/audio/`.
- Re-run `audio:download:kashf` after new playlist episodes are added (`--no-overwrites` skips existing files).
