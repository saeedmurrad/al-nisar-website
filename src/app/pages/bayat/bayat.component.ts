import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideChevronDown, LucideMapPin, LucidePhone } from '@lucide/angular';
import { CONTACT } from '../../data/contact.data';
import { BAYAT_INTRO, VISIT_GUIDE, bayatFaqItems } from '../../data/bayat.data';
import { FAQ_ITEMS, FaqItem } from '../../data/faq.data';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { Irshad } from '../../models/content.models';

@Component({
  selector: 'app-bayat',
  imports: [RouterLink, LucideChevronDown, LucideMapPin, LucidePhone],
  templateUrl: './bayat.component.html',
})
export class BayatComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  private readonly data = inject(DataService);
  readonly contact = CONTACT;

  readonly intro = BAYAT_INTRO;
  readonly visitGuide = VISIT_GUIDE;
  readonly openId = signal<string | null>(null);
  readonly faqItems = signal<FaqItem[]>([]);
  readonly loading = signal(true);
  readonly failed = signal(false);
  private readonly byId = signal<Map<string, Irshad>>(new Map());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getIrshadat()
        .then((items) => {
          const map = new Map<string, Irshad>();
          for (const item of items) map.set(item.id, item);
          this.byId.set(map);
          this.faqItems.set(bayatFaqItems(FAQ_ITEMS).filter((f) => map.has(f.irshadId)));
        })
        .catch(() => this.failed.set(true))
        .finally(() => this.loading.set(false));
    }
  }

  sectionTitle(section: { titleEn: string; titleUr: string }): string {
    return this.i18n.isUrdu() ? section.titleUr : section.titleEn;
  }

  sectionBody(section: { bodyEn: string; bodyUr: string }): string {
    return this.i18n.isUrdu() ? section.bodyUr : section.bodyEn;
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
    this.openId.update((c) => (c === id ? null : id));
  }

  isOpen(id: string): boolean {
    return this.openId() === id;
  }
}
