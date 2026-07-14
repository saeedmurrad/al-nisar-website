import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  LucideArrowLeft,
  LucideDownload,
  LucideExternalLink,
} from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { Book } from '../../models/content.models';

@Component({
  selector: 'app-book-reader',
  imports: [RouterLink, LucideArrowLeft, LucideDownload, LucideExternalLink],
  templateUrl: './book-reader.component.html',
})
export class BookReaderComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  readonly i18n = inject(TranslationService);
  readonly data = inject(DataService);

  readonly book = signal<Book | null>(null);
  readonly loading = signal(true);
  readonly failed = signal(false);

  readonly pdfUrl = computed(() => {
    const b = this.book();
    return b ? this.data.bookPdfUrl(b) : '';
  });

  /** Direct PDF for browsers that render PDFs in iframes. */
  readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const url = this.pdfUrl();
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  /**
   * Google Docs viewer as a mobile-friendly fallback when the browser won't
   * render a raw PDF inside an iframe (common on iOS Safari).
   */
  readonly docsViewerUrl = computed<SafeResourceUrl | null>(() => {
    const url = this.pdfUrl();
    if (!url) return null;
    const viewer = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(viewer);
  });

  readonly useDocsViewer = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const id = this.route.snapshot.paramMap.get('id') ?? '';
      this.data
        .getBook(id)
        .then((book) => {
          if (!book) {
            this.failed.set(true);
            return;
          }
          this.book.set(book);
        })
        .catch(() => this.failed.set(true))
        .finally(() => this.loading.set(false));
    }
  }

  displayTitle(book: Book): string {
    return this.i18n.isUrdu() && book.titleUrdu ? book.titleUrdu : book.title;
  }

  switchToDocsViewer(): void {
    this.useDocsViewer.set(true);
  }

  switchToNative(): void {
    this.useDocsViewer.set(false);
  }
}
