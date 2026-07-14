// Snapshots the YouTube channel's public RSS feed into public/assets/videos.json.
// Runs on every CI build (plus a daily scheduled rebuild) so the Videos page still
// works for visitors whose networks block the runtime CORS proxies.
import { writeFile } from 'node:fs/promises';

const CHANNEL_ID = 'UC23BcSt0ePR3K5dvgTgQIzw';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUT_FILE = new URL('../public/assets/videos.json', import.meta.url);

const res = await fetch(FEED_URL);
if (!res.ok) {
  console.error(`Feed request failed: ${res.status} — keeping existing snapshot`);
  process.exit(0);
}
const xml = await res.text();

const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
  .map(([, entry]) => ({
    id: entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? '',
    title: entry.match(/<title>([^<]*)<\/title>/)?.[1] ?? '',
    publishedAt: entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? '',
  }))
  .filter((v) => v.id);

if (videos.length === 0) {
  console.error('Feed contained no entries — keeping existing snapshot');
  process.exit(0);
}

await writeFile(OUT_FILE, JSON.stringify(videos, null, 2) + '\n');
console.log(`Wrote ${videos.length} videos to public/assets/videos.json`);
