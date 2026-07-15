export type Lang = 'en' | 'ur';

/** One teaching, joined from the `irshadat_ur` + `irshadat_en` Firestore collections by document ID. */
export interface Irshad {
  id: string;
  ur: string;
  en: string;
  imageUrl: string;
  dateLabel: string;
  createdAt: Date;
}

/** One Shajra Pak generation from the bundled list.json assets (same data as the Android app). */
export interface ShajraEntry {
  number: number;
  fullTitleEn: string;
  shortNameEn: string;
  fullTitleUr: string;
  /** Firebase Storage path of the Urdu detail PDF, e.g. `shajra_urdu/12.pdf` (from `shajra_urdu_details`). */
  urduPdfPath: string | null;
}

/** One image from the `gallery_images` Firestore collection. */
export interface GalleryItem {
  id: string;
  downloadUrl: string;
  folder: string;
  uploadedAt: Date;
}

export interface GalleryFolder {
  id: string;
  labelEn: string;
  labelUr: string;
}

/** One video from the public YouTube channel RSS feed. */
export interface SocialVideo {
  id: string;
  title: string;
  publishedAt: Date;
}

/** Facebook / YouTube destinations (defaults mirror the app's SocialLinksDefaults, overridable via Firestore `app_config/social`). */
export interface SocialLinks {
  facebookPageUrl: string;
  youtubeChannelUrl: string;
}

/** Classical Sufi masters featured in the focused daily sayings collection. */
export type ClassicalMaster = 'rumi' | 'ibn_arabi' | 'bastami' | 'shams_tabrizi';

export type SufiSayingTheme = 'gnosis' | 'love';

/** One entry from the bundled Gnosis and Divine Love sayings collection. */
export interface ClassicalSaying {
  id: string;
  sequence: number;
  dayOfYear: number;
  master: ClassicalMaster;
  theme: SufiSayingTheme;
  en: string;
  ur: string;
  sourceNote?: string;
}

/** One book from the Firestore `books` collection (same as the Android app). */
export interface Book {
  id: string;
  title: string;
  titleUrdu: string;
  author: string;
  category: string;
  description: string;
  storagePath: string;
  coverImageUrl: string;
  totalPages: number;
  uploadedAt: Date;
}

/** One audio episode from a bundled series manifest (R2-hosted). */
export interface AudioEpisode {
  episode: number;
  youtubeId: string;
  title: string;
  durationSec: number | null;
  publishedAt: string;
  file: string;
  r2Key?: string;
  audioUrl?: string;
}

/** One audio lecture series (e.g. Kashaf ul Mahjoob). */
export interface AudioSeries {
  id: string;
  titleEn: string;
  titleUr: string;
  playlistId: string;
  sourceUrl: string;
  episodeCount: number;
  r2PublicBaseUrl?: string;
  episodes: AudioEpisode[];
}

export interface AudioCatalogEntry {
  id: string;
  manifest: string;
  titleEn?: string;
  titleUr?: string;
}

export type EventType = 'mahfil' | 'bayat' | 'urs' | 'live' | 'other';

/** Upcoming or past gathering from bundled events.json (editable without redeploying app code). */
export interface SiteEvent {
  id: string;
  type: EventType;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  startsAt: string;
  endsAt?: string;
  locationEn: string;
  locationUr: string;
  isOnline?: boolean;
  link?: string;
}

/** Short home-page banner message from bundled announcements.json. */
export interface Announcement {
  id: string;
  messageEn: string;
  messageUr: string;
  link?: string;
  linkLabelEn?: string;
  linkLabelUr?: string;
  startsAt?: string;
  endsAt?: string;
}

export type SearchResultType = 'irshad' | 'faq' | 'book' | 'classical';

export interface SearchResult {
  type: SearchResultType;
  id: string;
  title: string;
  snippet: string;
  route: string;
}
