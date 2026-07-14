import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { LucideChevronDown, LucideChevronUp, LucideFileText } from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { ShajraEntry } from '../../models/content.models';

@Component({
  selector: 'app-shajra',
  imports: [LucideFileText, LucideChevronDown, LucideChevronUp],
  templateUrl: './shajra.component.html',
})
export class ShajraComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  private readonly data = inject(DataService);

  readonly nodes = signal<ShajraEntry[]>([]);
  readonly loading = signal(true);
  readonly failed = signal(false);
  readonly expanded = signal<number | null>(null);
  readonly detailHtml = signal<string>('');
  readonly detailLoading = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getShajra()
        .then((entries) => this.nodes.set(entries))
        .catch(() => this.failed.set(true))
        .finally(() => this.loading.set(false));
    }
  }

  toggle(no: number): void {
    if (this.expanded() === no) {
      this.expanded.set(null);
      this.detailHtml.set('');
      return;
    }
    this.expanded.set(no);
    this.detailHtml.set('');
    this.detailLoading.set(true);
    this.data
      .getShajraEnglishDetail(no)
      .then((html) => {
        if (this.expanded() === no) this.detailHtml.set(html);
      })
      .catch(() => {
        /* no bundled detail for this entry */
      })
      .finally(() => this.detailLoading.set(false));
  }

  pdfUrl(entry: ShajraEntry): string | null {
    return entry.urduPdfPath ? this.data.storageUrl(entry.urduPdfPath) : null;
  }
}
