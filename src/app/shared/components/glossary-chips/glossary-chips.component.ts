import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlossaryEntry } from '../../../data/glossary.data';
import { TranslationService } from '../../../core/services/translation.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-glossary-chips',
  imports: [RouterLink],
  template: `
    @if (terms.length) {
      <div class="mt-4 flex flex-wrap gap-2" [attr.aria-label]="i18n.t('glossary.relatedTerms')">
        <span
          class="text-[0.65rem] font-medium uppercase tracking-wider text-text-subtle"
          [class.font-urdu]="i18n.isUrdu()"
          [class.normal-case]="i18n.isUrdu()"
          [class.tracking-normal]="i18n.isUrdu()"
        >
          {{ i18n.t('glossary.relatedTerms') }}
        </span>
        @for (term of terms; track term.slug) {
          <a
            [routerLink]="['/glossary', term.slug]"
            class="chip !cursor-pointer border-emerald-primary/30 text-emerald-deep hover:border-amber-gold/50 hover:text-amber-deep"
            [class.font-urdu]="i18n.isUrdu()"
          >
            {{ i18n.isUrdu() ? term.termUr : term.termEn }}
          </a>
        }
      </div>
    }
  `,
})
export class GlossaryChipsComponent {
  readonly i18n = inject(TranslationService);
  @Input() terms: GlossaryEntry[] = [];
}
