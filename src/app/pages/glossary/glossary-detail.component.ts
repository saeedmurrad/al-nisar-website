import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideArrowLeft } from '@lucide/angular';
import { map } from 'rxjs/operators';
import { TranslationService } from '../../core/services/translation.service';
import { FAQ_ITEMS } from '../../data/faq.data';
import { getGlossaryEntry } from '../../data/glossary.data';

@Component({
  selector: 'app-glossary-detail',
  imports: [RouterLink, LucideArrowLeft],
  templateUrl: './glossary-detail.component.html',
})
export class GlossaryDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly i18n = inject(TranslationService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  readonly entry = computed(() => getGlossaryEntry(this.slug()));

  readonly relatedFaqs = computed(() => {
    const ids = this.entry()?.relatedFaqIds ?? [];
    return FAQ_ITEMS.filter((f) => ids.includes(f.id));
  });

  term(): string {
    const e = this.entry();
    if (!e) return '';
    return this.i18n.isUrdu() ? e.termUr : e.termEn;
  }

  otherTerm(): string {
    const e = this.entry();
    if (!e) return '';
    return this.i18n.isUrdu() ? e.termEn : e.termUr;
  }

  body(): string {
    const e = this.entry();
    if (!e) return '';
    return this.i18n.isUrdu() ? e.bodyUr : e.bodyEn;
  }

  faqQuestion(id: string): string {
    const item = FAQ_ITEMS.find((f) => f.id === id);
    if (!item) return id;
    return this.i18n.isUrdu() ? item.questionUr : item.questionEn;
  }
}
