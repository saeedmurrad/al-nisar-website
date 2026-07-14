import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideBookOpen,
  LucideCirclePlay,
  LucideExternalLink,
  LucideHeart,
  LucideImages,
  LucideLayoutGrid,
  LucideNetwork,
  LucideSmartphone,
} from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { Irshad, SocialLinks } from '../../models/content.models';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    LucideBookOpen,
    LucideCirclePlay,
    LucideExternalLink,
    LucideHeart,
    LucideNetwork,
    LucideImages,
    LucideLayoutGrid,
    LucideSmartphone,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  private readonly data = inject(DataService);

  readonly daily = signal<Irshad | null>(null);
  readonly loading = signal(true);
  readonly social = signal<SocialLinks>({
    facebookPageUrl: 'https://www.facebook.com/SufiNisarAhmad',
    youtubeChannelUrl: 'https://www.youtube.com/@sufinisarahmad159',
  });

  // Icons mirror the Android app's home grid: heart = Irshadat, tree = Shajra, grid = Gallery.
  readonly cards = [
    {
      path: '/irshadat',
      titleKey: 'nav.irshadat' as const,
      bodyKey: 'home.exploreIrshadat' as const,
      icon: 'heart' as const,
    },
    {
      path: '/shajra',
      titleKey: 'nav.shajra' as const,
      bodyKey: 'home.exploreShajra' as const,
      icon: 'tree' as const,
    },
    {
      path: '/gallery',
      titleKey: 'nav.gallery' as const,
      bodyKey: 'home.exploreGallery' as const,
      icon: 'grid' as const,
    },
    {
      path: '/books',
      titleKey: 'nav.books' as const,
      bodyKey: 'home.exploreBooks' as const,
      icon: 'book' as const,
    },
    {
      path: '/videos',
      titleKey: 'nav.videos' as const,
      bodyKey: 'home.exploreVideos' as const,
      icon: 'video' as const,
    },
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getIrshadat()
        .then((items) => this.daily.set(this.data.pickDailyIrshad(items)))
        .finally(() => this.loading.set(false));
      this.data.getSocialLinks().then((links) => this.social.set(links));
    }
  }
}
