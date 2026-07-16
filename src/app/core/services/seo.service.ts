import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_CONFIG } from '../../data/site.config';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  /** Optional noindex for utility pages like search. */
  noIndex?: boolean;
}

const PAGE_SEO: Record<string, Omit<PageSeo, 'path'>> = {
  '': {
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.defaultDescription,
  },
  irshadat: {
    title: 'Irshadat | AL-Nisar — Teachings of Sufi Nisar Ahmad',
    description:
      'Read Irshadat of Sufi Nisar Ahmad in Urdu and English — public spiritual teachings without login.',
  },
  'classical-irshadat': {
    title: 'Sufi Sayings | AL-Nisar — Gnosis and Divine Love',
    description:
      'Selected Sufi sayings on Divine gnosis and love from Rumi, Ibn Arabi, Bastami, and Shams Tabrizi.',
  },
  faq: {
    title: 'FAQ | AL-Nisar — Bayat, Tareeqat, and the Path',
    description:
      'Answers to common questions about Bayat, Tareeqat, worship, and the spiritual path, drawn from Irshadat.',
  },
  bayat: {
    title: 'Bayat & Visit Guide | AL-Nisar — Murshid Pak',
    description:
      'Learn about Bayat with Murshid Pak, how to prepare, and visiting Burewala Sharif with adab.',
  },
  events: {
    title: 'Events & Mahafil | AL-Nisar',
    description:
      'Upcoming mahafil, Bayat sessions, and live gatherings in Burewala Sharif and online.',
  },
  shajra: {
    title: 'Shajra Pak | AL-Nisar — Spiritual Lineage',
    description:
      'Explore the sacred spiritual lineage (Shajra Pak) of Sufi Nisar Ahmad — shared publicly for seekers.',
  },
  gallery: {
    title: 'Gallery | AL-Nisar',
    description: 'A calm gallery of Saeen G, gatherings, and moments from the spiritual path.',
  },
  videos: {
    title: 'Videos | AL-Nisar — YouTube and Facebook',
    description:
      'Watch Irshadat-e-Aalia, Naats Sharif, and blessed gatherings from the official YouTube channel and Facebook page.',
  },
  books: {
    title: 'Books | AL-Nisar — Blessed Writings',
    description: 'Read blessed books of Sufi Nisar Ahmad as PDFs in your browser.',
  },
  listen: {
    title: 'Listen | AL-Nisar — Audio Bayan',
    description: 'Stream Kashaf ul Mahjoob and other audio bayan series in your browser.',
  },
  search: {
    title: 'Search | AL-Nisar',
    description: 'Search Irshadat, FAQ, books, and Sufi sayings in one place.',
    noIndex: true,
  },
  login: {
    title: 'Member Portal | AL-Nisar',
    description: 'Sign in to the AL-Nisar member portal.',
    noIndex: true,
  },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  applyForUrl(url: string): void {
    const path = this.normalizePath(url);
    const page = this.resolvePage(path);
    const canonical = `${SITE_CONFIG.siteUrl}${page.path === '/' ? '/' : page.path}`;

    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({
      name: 'robots',
      content: page.noIndex ? 'noindex, follow' : 'index, follow',
    });

    this.setLinkCanonical(canonical);

    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_CONFIG.siteName });
    this.meta.updateTag({ property: 'og:image', content: SITE_CONFIG.ogImage });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: SITE_CONFIG.ogImage });
  }

  private normalizePath(url: string): string {
    const bare = url.split('?')[0].split('#')[0];
    return bare.replace(/^\//, '').replace(/\/$/, '');
  }

  private resolvePage(path: string): PageSeo {
    if (!path) {
      return { path: '/', ...PAGE_SEO[''] };
    }

    if (path.startsWith('books/')) {
      return {
        path: `/${path}`,
        title: 'Book Reader | AL-Nisar',
        description: 'Read a blessed book of Sufi Nisar Ahmad in your browser.',
      };
    }

    if (path.startsWith('listen/')) {
      return {
        path: `/${path}`,
        title: 'Listen | AL-Nisar — Audio Series',
        description: PAGE_SEO['listen'].description,
      };
    }

    const key = path.split('/')[0];
    const meta = PAGE_SEO[key];
    if (meta) {
      return { path: `/${key}`, ...meta };
    }

    return {
      path: `/${path}`,
      title: SITE_CONFIG.defaultTitle,
      description: SITE_CONFIG.defaultDescription,
    };
  }

  private setLinkCanonical(href: string): void {
    if (typeof document === 'undefined') return;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
