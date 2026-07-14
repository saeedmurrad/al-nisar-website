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
