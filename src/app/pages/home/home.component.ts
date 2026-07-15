import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideBookOpen,
  LucideCirclePlay,
  LucideExternalLink,
  LucideHeart,
  LucideHeadphones,
  LucideImages,
  LucideLayoutGrid,
  LucideMapPin,
  LucideMessageCircle,
  LucideNetwork,
  LucidePhone,
  LucideSend,
  LucideSmartphone,
  LucideSparkles,
} from '@lucide/angular';
import { CONTACT } from '../../data/contact.data';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { ClassicalMaster, ClassicalSaying, Irshad, SocialLinks } from '../../models/content.models';

const MASTER_ATTR: Record<ClassicalMaster, { en: string; ur: string }> = {
  rumi: { en: 'Maulana Jalaluddin Rumi', ur: 'مولانا جلال الدین رومی' },
  ibn_arabi: { en: 'Sheikh Muhyiddin Ibn Arabi', ur: 'شیخ محی الدین ابن عربی' },
  bastami: { en: 'Hazrat Bayazid Bastami', ur: 'حضرت بایزید بسطامی' },
  shams_tabrizi: { en: 'Khwaja Shams Tabrizi', ur: 'خواجہ شمس تبریزی' },
};

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    LucideBookOpen,
    LucideCirclePlay,
    LucideExternalLink,
    LucideHeart,
    LucideHeadphones,
    LucideNetwork,
    LucideImages,
    LucideLayoutGrid,
    LucideMapPin,
    LucideMessageCircle,
    LucidePhone,
    LucideSend,
    LucideSmartphone,
    LucideSparkles,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  private readonly data = inject(DataService);
  readonly contact = CONTACT;

  readonly daily = signal<Irshad | null>(null);
  readonly classical = signal<ClassicalSaying | null>(null);
  readonly loading = signal(true);
  readonly classicalLoading = signal(true);
  readonly social = signal<SocialLinks>({
    facebookPageUrl: 'https://www.facebook.com/SufiNisarAhmad',
    youtubeChannelUrl: 'https://www.youtube.com/@sufinisarahmad159',
  });

  readonly cards = [
    {
      path: '/irshadat',
      titleKey: 'nav.irshadat' as const,
      bodyKey: 'home.exploreIrshadat' as const,
      icon: 'heart' as const,
    },
    {
      path: '/classical-irshadat',
      titleKey: 'nav.classicalIrshadat' as const,
      bodyKey: 'home.exploreClassical' as const,
      icon: 'sparkles' as const,
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
      path: '/listen',
      titleKey: 'nav.listen' as const,
      bodyKey: 'home.exploreListen' as const,
      icon: 'headphones' as const,
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
      this.data
        .getClassicalIrshadat()
        .then((items) => this.classical.set(this.data.pickDailyClassical(items)))
        .finally(() => this.classicalLoading.set(false));
      this.data.getSocialLinks().then((links) => this.social.set(links));
    }
  }

  classicalAttribution(item: ClassicalSaying): { en: string; ur: string } {
    return MASTER_ATTR[item.master];
  }

  classicalMasterKey(master: ClassicalMaster): `classical.master.${ClassicalMaster}` {
    return `classical.master.${master}`;
  }
}
