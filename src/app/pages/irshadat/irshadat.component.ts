import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideCopy, LucideSearch, LucideShare2 } from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { ShareCardService } from '../../core/services/share-card.service';
import { TranslationService } from '../../core/services/translation.service';
import { CONTACT } from '../../data/contact.data';
import { Irshad } from '../../models/content.models';

@Component({
  selector: 'app-irshadat',
  imports: [FormsModule, LucideSearch, LucideCopy, LucideShare2],
  templateUrl: './irshadat.component.html',
})
export class IrshadatComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  private readonly data = inject(DataService);
  private readonly shareCard = inject(ShareCardService);

  readonly searchQuery = signal('');
  readonly copiedId = signal<string | null>(null);
  readonly all = signal<Irshad[]>([]);
  readonly loading = signal(true);
  readonly failed = signal(false);

  readonly filtered = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.all();
    return this.all().filter(
      (item) =>
        item.en.toLowerCase().includes(q) ||
        item.ur.includes(q) ||
        item.dateLabel.toLowerCase().includes(q),
    );
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getIrshadat()
        .then((items) => this.all.set(items))
        .catch(() => this.failed.set(true))
        .finally(() => this.loading.set(false));
    }
  }

  onSearch(value: string): void {
    this.searchQuery.set(value);
  }

  private shareText(item: Irshad): string {
    return this.shareCard.formatIrshadShareText(item);
  }

  async copy(item: Irshad): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      await navigator.clipboard.writeText(this.shareText(item));
      this.copiedId.set(item.id);
      setTimeout(() => {
        if (this.copiedId() === item.id) this.copiedId.set(null);
      }, 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  }

  async share(item: Irshad): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Irshad — Sufi Nisar Ahmad',
          text: this.shareCard.irshadShareBody(item),
          url: CONTACT.websiteUrl,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      await this.copy(item);
    }
  }
}
