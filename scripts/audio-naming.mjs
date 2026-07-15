/** Shared part-based filenames for local audio and R2 keys. */

export function partFileName(episode, youtubeId) {
  return `part-${String(episode).padStart(2, '0')}-${youtubeId}.m4a`;
}

export function partR2Key(seriesId, episode, youtubeId) {
  return `audio/${seriesId}/${partFileName(episode, youtubeId)}`;
}

/** Legacy playlist-index keys: audio/series/001-videoId.m4a */
export function isLegacyR2Key(key) {
  return /^audio\/[^/]+\/\d{3}-[^/]+\.m4a$/.test(key);
}
