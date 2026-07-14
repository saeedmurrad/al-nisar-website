import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideBookOpen,
  LucideHeart,
  LucideImages,
  LucideLayoutGrid,
  LucideNetwork,
  LucideSmartphone,
} from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { Irshad } from '../../models/content.models';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    LucideBookOpen,
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
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getIrshadat()
        .then((items) => this.daily.set(this.data.pickDailyIrshad(items)))
        .finally(() => this.loading.set(false));
    }
  }
}
