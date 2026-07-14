import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LucideChevronLeft, LucideChevronRight, LucideX } from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { GalleryFolder, GalleryItem } from '../../models/content.models';

@Component({
  selector: 'app-gallery',
  imports: [LucideX, LucideChevronLeft, LucideChevronRight],
  templateUrl: './gallery.component.html',
  styles: `
    .masonry {
      column-count: 1;
      column-gap: 1rem;
    }
    @media (min-width: 640px) {
      .masonry {
        column-count: 2;
      }
    }
    @media (min-width: 1024px) {
      .masonry {
        column-count: 3;
      }
    }
    .masonry-item {
      break-inside: avoid;
      margin-bottom: 1rem;
    }
  `,
})
export class GalleryComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  private readonly data = inject(DataService);

  readonly selectedFolder = signal<string>('all');
  readonly selected = signal<GalleryItem | null>(null);
  readonly all = signal<GalleryItem[]>([]);
  readonly loading = signal(true);
  readonly failed = signal(false);

  /** Only folders that actually contain images, in the app's defined order. */
  readonly folders = computed<GalleryFolder[]>(() => {
    const present = new Set(this.all().map((g) => g.folder));
    return this.data.galleryFolders.filter((f) => present.has(f.id));
  });

  readonly filtered = computed(() => {
    const folder = this.selectedFolder();
    return folder === 'all' ? this.all() : this.all().filter((g) => g.folder === folder);
  });

  readonly selectedIndex = computed(() => {
    const item = this.selected();
    if (!item) return -1;
    return this.filtered().findIndex((g) => g.id === item.id);
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getGallery()
        .then((items) => this.all.set(items))
        .catch(() => this.failed.set(true))
        .finally(() => this.loading.set(false));
    }
  }

  folderLabel(folderId: string): string {
    const folder = this.data.galleryFolders.find((f) => f.id === folderId);
    if (!folder) return folderId;
    return this.i18n.isUrdu() ? folder.labelUr : folder.labelEn;
  }

  setFolder(folderId: string): void {
    this.selectedFolder.set(folderId);
    this.selected.set(null);
  }

  open(item: GalleryItem): void {
    this.selected.set(item);
  }

  close(): void {
    this.selected.set(null);
  }

  prev(): void {
    const list = this.filtered();
    const idx = this.selectedIndex();
    if (idx < 0 || list.length === 0) return;
    this.selected.set(list[(idx - 1 + list.length) % list.length]);
  }

  next(): void {
    const list = this.filtered();
    const idx = this.selectedIndex();
    if (idx < 0 || list.length === 0) return;
    this.selected.set(list[(idx + 1) % list.length]);
  }

  @HostListener('document:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.selected()) return;
    if (event.key === 'Escape') this.close();
    if (event.key === 'ArrowLeft') this.prev();
    if (event.key === 'ArrowRight') this.next();
  }
}
