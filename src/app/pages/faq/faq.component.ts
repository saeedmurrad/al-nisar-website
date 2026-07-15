import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideChevronDown } from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { FAQ_CATEGORIES, FAQ_ITEMS, FaqCategory, FaqItem } from '../../data/faq.data';
import { Irshad } from '../../models/content.models';

@Component({
  selector: 'app-faq',
  imports: [RouterLink, LucideChevronDown],
  templateUrl: './faq.component.html',
})
export class FaqComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  private readonly data = inject(DataService);

  readonly openId = signal<string | null>(null);
  readonly loading = signal(true);
  readonly failed = signal(false);
  private readonly byId = signal<Map<string, Irshad>>(new Map());

  readonly categories = FAQ_CATEGORIES;

  /** FAQs whose source Irshad exists in Firebase (hide orphaned entries). */
  readonly resolved = computed(() => {
    const map = this.byId();
    return FAQ_ITEMS.filter((item) => map.has(item.irshadId));
  });

  readonly sections = computed(() => {
    const items = this.resolved();
    return this.categories
      .map((category) => ({
        category,
        items: items.filter((i) => i.category === category),
      }))
      .filter((s) => s.items.length > 0);
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getIrshadat()
        .then((items) => {
          const map = new Map<string, Irshad>();
          for (const item of items) map.set(item.id, item);
          this.byId.set(map);
        })
        .catch(() => this.failed.set(true))
        .finally(() => this.loading.set(false));
    }
  }

  categoryKey(category: FaqCategory): `faq.category.${FaqCategory}` {
    return `faq.category.${category}`;
  }

  question(item: FaqItem): string {
    return this.i18n.isUrdu() ? item.questionUr : item.questionEn;
  }

  answer(item: FaqItem): string {
    const irshad = this.byId().get(item.irshadId);
    if (!irshad) return '';
    return this.i18n.isUrdu() ? irshad.ur : irshad.en;
  }

  toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }

  isOpen(id: string): boolean {
    return this.openId() === id;
  }
}
