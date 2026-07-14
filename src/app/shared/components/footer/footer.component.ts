import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="mt-auto border-t border-emerald-900/30 bg-spiritual-surface/40">
      <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div class="max-w-md">
          <p class="text-lg font-bold text-text-primary">AL-Nisar / <span class="font-urdu text-amber-gold">النثار</span></p>
          <p
            class="mt-2 text-sm text-text-muted"
            [class.font-urdu]="i18n.isUrdu()"
            [class.leading-loose]="i18n.isUrdu()"
          >
            {{ i18n.t('footer.tagline') }}
          </p>
        </div>
        <div class="flex flex-wrap gap-4 text-sm text-text-subtle">
          <a routerLink="/irshadat" class="hover:text-emerald-soft transition">
            <span [class.font-urdu]="i18n.isUrdu()">{{ i18n.t('nav.irshadat') }}</span>
          </a>
          <a routerLink="/shajra" class="hover:text-emerald-soft transition">
            <span [class.font-urdu]="i18n.isUrdu()">{{ i18n.t('nav.shajra') }}</span>
          </a>
          <a routerLink="/gallery" class="hover:text-emerald-soft transition">
            <span [class.font-urdu]="i18n.isUrdu()">{{ i18n.t('nav.gallery') }}</span>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.alnisar.alnisarapp"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-emerald-soft transition"
          >
            Android App
          </a>
        </div>
      </div>
      <div class="border-t border-emerald-900/20 py-4 text-center text-xs text-text-subtle">
        <span [class.font-urdu]="i18n.isUrdu()">{{ i18n.t('footer.rights') }}</span>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly i18n = inject(TranslationService);
}
