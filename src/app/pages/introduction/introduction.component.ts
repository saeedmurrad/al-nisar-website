import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FANA_LADDER,
  INTRO_INVOCATION,
  INTRO_SECTIONS,
  IntroParagraph,
  IntroQuote,
  IntroSaying,
  IntroSection,
} from '../../data/introduction.data';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-introduction',
  imports: [RouterLink],
  templateUrl: './introduction.component.html',
})
export class IntroductionComponent {
  readonly i18n = inject(TranslationService);
  readonly invocation = INTRO_INVOCATION;
  readonly sections = INTRO_SECTIONS;
  readonly fanaLadder = FANA_LADDER;
  readonly portraitSrc = '/assets/images/sufi_nisar.jpg';

  text(p: IntroParagraph): string {
    return this.i18n.isUrdu() ? p.ur : p.en;
  }

  sectionTitle(s: IntroSection): string {
    return this.i18n.isUrdu() ? s.titleUr : s.titleEn;
  }

  jumpLabel(s: IntroSection): string {
    return this.i18n.isUrdu() ? s.jumpUr : s.jumpEn;
  }

  quoteText(q: IntroQuote): string {
    return this.i18n.isUrdu() ? q.ur : q.en;
  }

  sayingTitle(s: IntroSaying): string {
    return this.i18n.isUrdu() ? s.titleUr : s.titleEn;
  }

  sayingBody(s: IntroSaying): string {
    return this.i18n.isUrdu() ? s.bodyUr : s.bodyEn;
  }

  fanaLabel(step: (typeof FANA_LADDER)[number]): string {
    return this.i18n.isUrdu() ? step.ur : step.en;
  }
}
