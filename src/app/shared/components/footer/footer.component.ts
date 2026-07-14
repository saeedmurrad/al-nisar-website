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
          <div class="mt-4 flex items-center gap-3">
            <a
              href="https://www.facebook.com/SufiNisarAhmad"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="i18n.t('connect.facebook')"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-900/40
                     bg-spiritual-surface/60 text-text-muted transition hover:border-amber-gold/50 hover:text-amber-gold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@sufinisarahmad159"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="i18n.t('connect.youtube')"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-900/40
                     bg-spiritual-surface/60 text-text-muted transition hover:border-amber-gold/50 hover:text-amber-gold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
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
          <a routerLink="/videos" class="hover:text-emerald-soft transition">
            <span [class.font-urdu]="i18n.isUrdu()">{{ i18n.t('nav.videos') }}</span>
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
