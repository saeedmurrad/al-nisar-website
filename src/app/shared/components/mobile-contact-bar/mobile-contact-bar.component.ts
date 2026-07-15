import { Component, inject } from '@angular/core';
import { LucideMapPin, LucideMessageCircle, LucidePhone } from '@lucide/angular';
import { CONTACT } from '../../../data/contact.data';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-mobile-contact-bar',
  imports: [LucidePhone, LucideMessageCircle, LucideMapPin],
  template: `
    <div
      class="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
      aria-hidden="false"
    >
      <div
        class="pointer-events-auto mx-auto flex max-w-lg items-center gap-2 rounded-2xl border border-emerald-900/40
               bg-spiritual-bg/95 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <a
          [href]="contact.telUrl"
          class="btn-primary flex-1 !rounded-xl !py-3 !text-xs"
          [attr.aria-label]="i18n.t('contact.call')"
        >
          <svg lucidePhone [size]="16"></svg>
          <span [class.font-urdu]="i18n.isUrdu()">{{ i18n.t('contact.call') }}</span>
        </a>
        <a
          [href]="contact.whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-outline flex-1 !rounded-xl !py-3 !text-xs"
          [attr.aria-label]="i18n.t('contact.whatsapp')"
        >
          <svg lucideMessageCircle [size]="16"></svg>
          <span [class.font-urdu]="i18n.isUrdu()">{{ i18n.t('contact.whatsapp') }}</span>
        </a>
        <a
          [href]="contact.mapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-700/40
                 text-emerald-soft transition hover:border-amber-gold/40 hover:text-amber-gold"
          [attr.aria-label]="i18n.t('contact.directions')"
        >
          <svg lucideMapPin [size]="18"></svg>
        </a>
      </div>
    </div>
  `,
})
export class MobileContactBarComponent {
  readonly i18n = inject(TranslationService);
  readonly contact = CONTACT;
}
