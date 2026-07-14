import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { LucideLanguages } from '@lucide/angular';

@Component({
  selector: 'app-language-toggle',
  imports: [LucideLanguages],
  template: `
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-full border border-emerald-800/50 bg-spiritual-surface/60
             px-3 py-1.5 text-xs font-semibold tracking-wide text-text-muted transition
             hover:border-emerald-primary/50 hover:text-emerald-soft"
      (click)="i18n.toggle()"
      [attr.aria-label]="i18n.lang() === 'en' ? 'Switch to Urdu' : 'Switch to English'"
    >
      <svg lucideLanguages [size]="14" class="shrink-0 opacity-80"></svg>
      <span
        class="rounded-full px-2 py-0.5 transition"
        [class.bg-emerald-deep]="i18n.lang() === 'en'"
        [class.text-white]="i18n.lang() === 'en'"
      >
        EN
      </span>
      <span
        class="font-urdu rounded-full px-2 py-0.5 text-sm transition"
        [class.bg-emerald-deep]="i18n.lang() === 'ur'"
        [class.text-white]="i18n.lang() === 'ur'"
      >
        اردو
      </span>
    </button>
  `,
})
export class LanguageToggleComponent {
  readonly i18n = inject(TranslationService);
}
