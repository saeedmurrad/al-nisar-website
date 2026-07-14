import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

const PORTAL_URL = 'https://portal.al-nisar.com/';

@Component({
  selector: 'app-portal-redirect',
  template: `
    <section class="hero-gradient flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div class="card-spiritual glow-emerald w-full max-w-md p-8 text-center">
        <p class="text-lg font-bold text-text-primary">
          AL-Nisar / <span class="font-urdu text-amber-gold">النثار</span>
        </p>
        <h1 class="mt-3 text-xl font-semibold text-text-primary" [class.font-urdu]="i18n.isUrdu()">
          {{ i18n.t('nav.memberPortal') }}
        </h1>
        <p class="mt-4 text-sm text-text-muted" [class.font-urdu]="i18n.isUrdu()">
          {{ i18n.t('common.loading') }}
        </p>
        <a [href]="portalUrl" class="btn-primary mt-6" rel="noopener noreferrer">
          portal.al-nisar.com
        </a>
      </div>
    </section>
  `,
})
export class PortalRedirectComponent {
  readonly i18n = inject(TranslationService);
  readonly portalUrl = PORTAL_URL;

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      window.location.href = PORTAL_URL;
    }
  }
}
