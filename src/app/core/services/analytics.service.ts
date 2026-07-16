import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { SITE_CONFIG } from '../../data/site.config';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsConsent = 'granted' | 'denied' | 'unknown';

const CONSENT_STORAGE_KEY = 'al-nisar-analytics-consent';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private initialized = false;
  private readonly consent = signal<AnalyticsConsent>('unknown');

  readonly consentStatus = this.consent.asReadonly();
  readonly showConsentPrompt = computed(
    () => this.configured && this.consent() === 'unknown',
  );

  get measurementId(): string {
    return SITE_CONFIG.gaMeasurementId.trim();
  }

  get configured(): boolean {
    return isPlatformBrowser(this.platformId) && /^G-[A-Z0-9]+$/i.test(this.measurementId);
  }

  hasConsent(): boolean {
    return this.configured && this.consent() === 'granted';
  }

  /** Load any saved choice from localStorage (browser only). */
  restoreConsent(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (saved === 'granted' || saved === 'denied') {
      this.consent.set(saved);
    }
  }

  grantConsent(): void {
    if (!this.configured) return;
    this.persist('granted');
    this.init();
  }

  denyConsent(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.persist('denied');
  }

  init(): void {
    if (!this.hasConsent() || this.initialized) return;
    const id = this.measurementId;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', id, {
      send_page_view: false,
      anonymize_ip: true,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    this.initialized = true;
  }

  trackPageView(path: string, title?: string): void {
    if (!this.hasConsent()) return;
    this.init();
    window.gtag?.('event', 'page_view', {
      page_path: path,
      page_title: title ?? document.title,
      page_location: `${SITE_CONFIG.siteUrl}${path.startsWith('/') ? path : `/${path}`}`,
    });
  }

  private persist(value: 'granted' | 'denied'): void {
    this.consent.set(value);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // Private mode / blocked storage — choice still applies for this session.
    }
  }
}
