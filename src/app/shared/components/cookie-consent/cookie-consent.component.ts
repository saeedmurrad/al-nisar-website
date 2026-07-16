import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-cookie-consent',
  template: `
    @if (analytics.showConsentPrompt()) {
      <div
        class="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]
               max-md:bottom-[4.75rem]"
        role="dialog"
        aria-live="polite"
        [attr.aria-label]="i18n.t('consent.title')"
      >
        <div
          class="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-emerald-900/40
                 bg-spiritual-bg/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl
                 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
        >
          <div class="min-w-0 flex-1">
            <p
              class="text-sm font-medium text-text-primary"
              [class.font-urdu]="i18n.isUrdu()"
            >
              {{ i18n.t('consent.title') }}
            </p>
            <p
              class="mt-1 text-xs leading-relaxed text-text-muted sm:text-sm"
              [class.font-urdu]="i18n.isUrdu()"
            >
              {{ i18n.t('consent.message') }}
            </p>
          </div>
          <div class="flex shrink-0 gap-2 sm:flex-col sm:w-36">
            <button
              type="button"
              class="btn-primary flex-1 !rounded-xl !py-2.5 !text-xs sm:!text-sm"
              (click)="accept()"
            >
              <span [class.font-urdu]="i18n.isUrdu()">{{ i18n.t('consent.accept') }}</span>
            </button>
            <button
              type="button"
              class="btn-outline flex-1 !rounded-xl !py-2.5 !text-xs sm:!text-sm"
              (click)="decline()"
            >
              <span [class.font-urdu]="i18n.isUrdu()">{{ i18n.t('consent.decline') }}</span>
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class CookieConsentComponent {
  readonly i18n = inject(TranslationService);
  readonly analytics = inject(AnalyticsService);

  accept(): void {
    this.analytics.grantConsent();
    this.analytics.trackPageView(typeof location !== 'undefined' ? location.pathname : '/');
  }

  decline(): void {
    this.analytics.denyConsent();
  }
}
