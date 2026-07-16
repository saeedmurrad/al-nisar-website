import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { SITE_CONFIG } from '../../data/site.config';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private initialized = false;

  get measurementId(): string {
    return SITE_CONFIG.gaMeasurementId.trim();
  }

  get enabled(): boolean {
    return isPlatformBrowser(this.platformId) && /^G-[A-Z0-9]+$/i.test(this.measurementId);
  }

  init(): void {
    if (!this.enabled || this.initialized) return;
    const id = this.measurementId;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', id, { send_page_view: false });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    this.initialized = true;
  }

  trackPageView(path: string, title?: string): void {
    if (!this.enabled) return;
    this.init();
    window.gtag?.('event', 'page_view', {
      page_path: path,
      page_title: title ?? document.title,
      page_location: `${SITE_CONFIG.siteUrl}${path.startsWith('/') ? path : `/${path}`}`,
    });
  }
}
