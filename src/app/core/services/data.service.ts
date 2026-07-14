import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  GalleryFolder,
  GalleryItem,
  Irshad,
  ShajraEntry,
  SocialLinks,
  SocialVideo,
} from '../../models/content.models';

/**
 * Firebase project of the AL Nisar Android app (see AL-Nisar/lib/firebase_options.dart).
 * All content collections are publicly readable, so the website reads the exact same
 * live data via the Firestore REST API — updates in the app appear here automatically.
 */
const FIREBASE_PROJECT_ID = 'al-nisar-app';
const FIREBASE_API_KEY = 'AIzaSyA_aW0gKdgAwIlkLQoK-IbIxngdfAdGlSA';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;
const STORAGE_BUCKET = 'al-nisar-app.firebasestorage.app';

/** Same defaults as the app (AL-Nisar/lib/config/social_links.dart), overridable via Firestore `app_config/social`. */
const SOCIAL_DEFAULTS: SocialLinks = {
  facebookPageUrl: 'https://www.facebook.com/SufiNisarAhmad',
  youtubeChannelUrl: 'https://www.youtube.com/@sufinisarahmad159',
};

/** Channel ID of @sufinisarahmad159 — used for the public uploads RSS feed. */
const YOUTUBE_CHANNEL_ID = 'UC23BcSt0ePR3K5dvgTgQIzw';

/** YouTube's RSS feed has no CORS headers, so the browser reads it through a public CORS proxy (tried in order). */
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
const YOUTUBE_FEED_PROXIES = [
  `https://corsproxy.io/?url=${encodeURIComponent(YOUTUBE_FEED_URL)}`,
  `https://api.allorigins.win/raw?url=${encodeURIComponent(YOUTUBE_FEED_URL)}`,
];

interface FirestoreValue {
  stringValue?: string;
  booleanValue?: boolean;
  integerValue?: string;
  timestampValue?: string;
}

interface FirestoreDocument {
  name: string;
  fields?: Record<string, FirestoreValue>;
}

interface FirestoreListResponse {
  documents?: FirestoreDocument[];
  nextPageToken?: string;
}

interface ShajraListJsonEntry {
  number: number;
  fullTitle: string;
  shortName: string;
}

function docId(doc: FirestoreDocument): string {
  return doc.name.slice(doc.name.lastIndexOf('/') + 1);
}

function str(doc: FirestoreDocument, field: string): string {
  return doc.fields?.[field]?.stringValue ?? '';
}

function bool(doc: FirestoreDocument, field: string, fallback = true): boolean {
  return doc.fields?.[field]?.booleanValue ?? fallback;
}

function ts(doc: FirestoreDocument, field: string): Date {
  const v = doc.fields?.[field]?.timestampValue;
  return v ? new Date(v) : new Date(0);
}

/** Deterministic per-day PRNG mirroring the app's date-seeded daily pick. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);

  private irshadatCache: Promise<Irshad[]> | null = null;
  private shajraCache: Promise<ShajraEntry[]> | null = null;
  private galleryCache: Promise<GalleryItem[]> | null = null;
  private videosCache: Promise<SocialVideo[]> | null = null;
  private socialLinksCache: Promise<SocialLinks> | null = null;

  /** Gallery folders as defined in the app (AL-Nisar/lib/models/gallery_folder.dart). */
  readonly galleryFolders: GalleryFolder[] = [
    { id: 'saeen_g', labelEn: 'Saeen G', labelUr: 'سعین جی' },
    { id: 'blessed_family', labelEn: 'Blessed Family', labelUr: 'اہلِ بیتِ مبارک' },
    { id: 'banner', labelEn: 'Banner', labelUr: 'بینر' },
    { id: 'irshadat', labelEn: 'Irshad Pak', labelUr: 'ارشاد پاک' },
    { id: 'general', labelEn: 'General', labelUr: 'عمومی' },
  ];

  private async listCollection(collection: string): Promise<FirestoreDocument[]> {
    const docs: FirestoreDocument[] = [];
    let pageToken = '';
    do {
      const url =
        `${FIRESTORE_BASE}/${collection}?pageSize=300&key=${FIREBASE_API_KEY}` +
        (pageToken ? `&pageToken=${pageToken}` : '');
      const res = await firstValueFrom(this.http.get<FirestoreListResponse>(url));
      docs.push(...(res.documents ?? []));
      pageToken = res.nextPageToken ?? '';
    } while (pageToken);
    return docs;
  }

  /**
   * Loads teachings from `irshadat_ur` and `irshadat_en`, joined by document ID
   * (the app writes both languages under the same ID). Filters `isActive`,
   * sorts by `createdAt` descending — same as the app's IrshadatService.
   */
  getIrshadat(): Promise<Irshad[]> {
    this.irshadatCache ??= (async () => {
      const [urDocs, enDocs] = await Promise.all([
        this.listCollection('irshadat_ur'),
        this.listCollection('irshadat_en'),
      ]);
      const enById = new Map(
        enDocs.filter((d) => bool(d, 'isActive')).map((d) => [docId(d), d]),
      );
      const items: Irshad[] = urDocs
        .filter((d) => bool(d, 'isActive'))
        .map((d) => {
          const en = enById.get(docId(d));
          return {
            id: docId(d),
            ur: str(d, 'text'),
            en: en ? str(en, 'text') : '',
            imageUrl: str(d, 'imageUrl'),
            dateLabel: str(d, 'dateLabel'),
            createdAt: ts(d, 'createdAt'),
          };
        });
      items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      return items;
    })();
    return this.irshadatCache;
  }

  /**
   * Stable daily pick: same calendar day always shows the same irshad
   * (mirrors the app's IrshadDailyPicker date-seeded random over the id-sorted list).
   */
  pickDailyIrshad(items: Irshad[], now = new Date()): Irshad | null {
    if (items.length === 0) return null;
    const sorted = [...items].sort((a, b) => a.id.localeCompare(b.id));
    const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    const index = Math.floor(mulberry32(seed)() * sorted.length);
    return sorted[index];
  }

  /**
   * Shajra Pak: the 40-generation list ships as JSON (copied from the app's bundled
   * assets); Urdu detail PDFs live in Firestore `shajra_urdu_details` + Storage.
   */
  getShajra(): Promise<ShajraEntry[]> {
    this.shajraCache ??= (async () => {
      const [enList, urList, pdfDocs] = await Promise.all([
        firstValueFrom(
          this.http.get<ShajraListJsonEntry[]>('/assets/shajra/english/list.json'),
        ),
        firstValueFrom(
          this.http.get<ShajraListJsonEntry[]>('/assets/shajra/urdu/list.json'),
        ),
        this.listCollection('shajra_urdu_details').catch(() => [] as FirestoreDocument[]),
      ]);
      const urByNumber = new Map(urList.map((e) => [e.number, e]));
      const pdfByNumber = new Map(
        pdfDocs
          .filter((d) => bool(d, 'isActive') && str(d, 'storagePath'))
          .map((d) => [Number(d.fields?.['number']?.integerValue ?? docId(d)), str(d, 'storagePath')]),
      );
      return enList
        .map((e) => ({
          number: e.number,
          fullTitleEn: e.fullTitle.replace(/^E/, ''),
          shortNameEn: e.shortName,
          fullTitleUr: urByNumber.get(e.number)?.fullTitle ?? '',
          urduPdfPath: pdfByNumber.get(e.number) ?? null,
        }))
        .sort((a, b) => a.number - b.number);
    })();
    return this.shajraCache;
  }

  /** English detail page for a generation, bundled as HTML (same as the app). */
  getShajraEnglishDetail(no: number): Promise<string> {
    const padded = String(no).padStart(2, '0');
    return firstValueFrom(
      this.http.get(`/assets/shajra/english/details/${padded}.html`, {
        responseType: 'text',
      }),
    );
  }

  storageUrl(path: string): string {
    return `https://firebasestorage.googleapis.com/v0/b/${STORAGE_BUCKET}/o/${encodeURIComponent(path)}?alt=media`;
  }

  /**
   * Gallery from `gallery_images`: active images with a download URL,
   * newest first — same filtering as the app's GalleryService.
   */
  getGallery(): Promise<GalleryItem[]> {
    this.galleryCache ??= (async () => {
      const docs = await this.listCollection('gallery_images');
      const items: GalleryItem[] = docs
        .filter((d) => bool(d, 'isActive') && str(d, 'downloadUrl'))
        .map((d) => ({
          id: docId(d),
          downloadUrl: str(d, 'downloadUrl'),
          folder: str(d, 'folder') || 'general',
          uploadedAt: ts(d, 'uploadedAt'),
        }));
      items.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
      return items;
    })();
    return this.galleryCache;
  }

  /**
   * Facebook / YouTube links. Tries the same Firestore doc the app's admin screen
   * edits (`app_config/social`); falls back to the app's bundled defaults when the
   * doc is not publicly readable.
   */
  getSocialLinks(): Promise<SocialLinks> {
    this.socialLinksCache ??= (async () => {
      try {
        const url = `${FIRESTORE_BASE}/app_config/social?key=${FIREBASE_API_KEY}`;
        const doc = await firstValueFrom(this.http.get<FirestoreDocument>(url));
        return {
          facebookPageUrl: str(doc, 'facebookPageUrl') || SOCIAL_DEFAULTS.facebookPageUrl,
          youtubeChannelUrl:
            str(doc, 'youtubeChannelUrl') || SOCIAL_DEFAULTS.youtubeChannelUrl,
        };
      } catch {
        return SOCIAL_DEFAULTS;
      }
    })();
    return this.socialLinksCache;
  }

  /**
   * Latest uploads from the YouTube channel (max 15, newest first).
   * Primary source is the bundled snapshot (`assets/videos.json`, refreshed daily
   * by the deploy workflow) — it always loads, with no third-party dependency.
   * The live RSS feed via CORS proxies is only a fallback.
   */
  getVideos(): Promise<SocialVideo[]> {
    this.videosCache ??= (async () => {
      try {
        const snapshot = await firstValueFrom(
          this.http.get<{ id: string; title: string; publishedAt: string }[]>(
            '/assets/videos.json',
          ),
        );
        if (snapshot.length > 0) {
          return snapshot.map((v) => ({
            id: v.id,
            title: v.title,
            publishedAt: new Date(v.publishedAt),
          }));
        }
      } catch {
        // snapshot missing — fall back to the live feed below
      }
      return this.fetchLiveFeed();
    })();
    return this.videosCache;
  }

  private async fetchLiveFeed(): Promise<SocialVideo[]> {
    let xml = '';
    for (const proxyUrl of YOUTUBE_FEED_PROXIES) {
      try {
        xml = await firstValueFrom(
          this.http.get(proxyUrl, { responseType: 'text' }),
        );
        if (xml.includes('<entry>')) break;
        xml = '';
      } catch {
        // fall through to the next proxy
      }
    }
    if (!xml) throw new Error('YouTube feed unavailable');

    const feed = new DOMParser().parseFromString(xml, 'text/xml');
    const videos: SocialVideo[] = [];
    for (const entry of Array.from(feed.querySelectorAll('entry'))) {
      const id = entry.getElementsByTagName('yt:videoId')[0]?.textContent ?? '';
      if (!id) continue;
      videos.push({
        id,
        title: entry.querySelector('title')?.textContent ?? '',
        publishedAt: new Date(entry.querySelector('published')?.textContent ?? 0),
      });
    }
    return videos;
  }

  videoThumbnail(id: string): string {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }

  videoEmbedUrl(id: string): string {
    return `https://www.youtube-nocookie.com/embed/${id}`;
  }

  videoWatchUrl(id: string): string {
    return `https://www.youtube.com/watch?v=${id}`;
  }
}
