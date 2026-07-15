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

## Important

- Binaries are **not** committed and are **not** deployed by GitHub Actions / GitHub Pages.
- For production listening later, upload the `.m4a` files to Firebase Storage and point the site at those URLs.
- Re-run the npm script to refresh after new playlist episodes are added (`--no-overwrites` skips existing files).
