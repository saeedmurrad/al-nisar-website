import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  LucideBookOpen,
  LucideCalendar,
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
  LucideShare2,
  LucideSparkles,
} from '@lucide/angular';
import { interval } from 'rxjs';
import { CONTACT } from '../../data/contact.data';
import { DataService } from '../../core/services/data.service';
import { ShareCardService } from '../../core/services/share-card.service';
import { TranslationService } from '../../core/services/translation.service';
import { ClassicalMaster, ClassicalSaying, Irshad, SocialLinks } from '../../models/content.models';

const MASTER_ATTR: Record<ClassicalMaster, { en: string; ur: string }> = {
  rumi: { en: 'Maulana Jalaluddin Rumi', ur: 'مولانا جلال الدین رومی' },
  ibn_arabi: { en: 'Sheikh Muhyiddin Ibn Arabi', ur: 'شیخ محی الدین ابن عربی' },
  bastami: { en: 'Hazrat Bayazid Bastami', ur: 'حضرت بایزید بسطامی' },
  shams_tabrizi: { en: 'Khwaja Shams Tabrizi', ur: 'خواجہ شمس تبریزی' },
  mujaddid_alf_sani: {
    en: 'Hazrat Mujaddid Alf Sani Imam Rabbani',
    ur: 'حضرت مجدد الف ثانی امام ربانی',
  },
  bahauddin_naqshband: {
    en: 'Hazrat Bahauddin Naqshband',
    ur: 'حضرت بہاؤالدین نقشبند',
  },
  abdul_khaliq_ghujdawani: {
    en: 'Hazrat Abdul Khaliq Ghujdawani',
    ur: 'حضرت عبدالخالق غجدوانی',
  },
  baqi_billah: { en: 'Hazrat Khwaja Baqi Billah', ur: 'حضرت خواجہ باقی باللہ' },
  abdul_qadir_jilani: {
    en: 'Hazrat Abdul Qadir Jilani',
    ur: 'حضرت عبدالقادر جیلانی',
  },
};

const MADINA_FLIP_MS = 5000;

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    LucideBookOpen,
    LucideCalendar,
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
    LucideShare2,
    LucideSparkles,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  readonly i18n = inject(TranslationService);
  private readonly data = inject(DataService);
  private readonly shareCard = inject(ShareCardService);
  readonly contact = CONTACT;

  readonly daily = signal<Irshad | null>(null);
  readonly classical = signal<ClassicalSaying | null>(null);
  readonly loading = signal(true);
  readonly classicalLoading = signal(true);
  readonly shareLoading = signal(false);
  readonly madinaSlide = signal(0);
  readonly social = signal<SocialLinks>({
    facebookPageUrl: 'https://www.facebook.com/SufiNisarAhmad',
    youtubeChannelUrl: 'https://www.youtube.com/@sufinisarahmad159',
  });

  /** Mawajah Sharif jaali + Madina flipper (Wikimedia Commons — see ATTRIBUTION.txt). */
  readonly madinaImages = [
    {
      src: '/assets/images/madina/mawajah-jaali-1.jpg',
      alt: 'Mawajah Sharif jaali — blessed grille at Masjid an-Nabawi',
      labelKey: 'home.mawajahLabel' as const,
      position: 'center top',
    },
    {
      src: '/assets/images/madina/mawajah-jaali-2.jpg',
      alt: 'Rawdah Sharifah — Mawajah area inside Masjid an-Nabawi',
      labelKey: 'home.mawajahLabel' as const,
      position: 'center',
    },
    {
      src: '/assets/images/madina/mawajah-jaali-3.jpg',
      alt: 'Rawdah Sharifah — Mawajah jaali screens, Madina Munawwarah',
      labelKey: 'home.mawajahLabel' as const,
      position: 'center',
    },
    {
      src: '/assets/images/madina/mawajah-sitar.jpg',
      alt: 'Sitar al-Hujrah — Mawajah Sharif curtain and screens',
      labelKey: 'home.mawajahLabel' as const,
      position: 'center',
    },
    {
      src: '/assets/images/madina/mawajah-jaali-5.jpg',
      alt: 'Al-Rawda — sacred Mawajah area in Masjid an-Nabawi',
      labelKey: 'home.mawajahLabel' as const,
      position: 'center',
    },
    {
      src: '/assets/images/madina/nabawi-interior.jpg',
      alt: 'Masjid an-Nabawi interior — Madina Munawwarah',
      labelKey: 'home.madinaTitle' as const,
      position: 'center',
    },
    {
      src: '/assets/images/madina/nabawi-aerial.jpg',
      alt: 'Masjid an-Nabawi — aerial view of Madina Munawwarah',
      labelKey: 'home.madinaTitle' as const,
      position: 'center',
    },
  ] as const;

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
      path: '/events',
      titleKey: 'nav.events' as const,
      bodyKey: 'home.exploreEvents' as const,
      icon: 'calendar' as const,
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

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.data
      .getIrshadat()
      .then((items) => this.daily.set(this.data.pickDailyIrshad(items)))
      .finally(() => this.loading.set(false));
    this.data
      .getClassicalIrshadat()
      .then((items) => this.classical.set(this.data.pickDailyClassical(items)))
      .finally(() => this.classicalLoading.set(false));
    this.data.getSocialLinks().then((links) => this.social.set(links));

    interval(MADINA_FLIP_MS)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.madinaSlide.update((i) => (i + 1) % this.madinaImages.length);
      });
  }

  goToMadinaSlide(index: number): void {
    this.madinaSlide.set(index);
  }

  async shareDailyImage(): Promise<void> {
    const irshad = this.daily();
    if (!irshad || !isPlatformBrowser(this.platformId)) return;
    this.shareLoading.set(true);
    try {
      await this.shareCard.shareIrshadCard(irshad);
    } catch {
      /* user cancelled or canvas unsupported */
    } finally {
      this.shareLoading.set(false);
    }
  }

  classicalAttribution(item: ClassicalSaying): { en: string; ur: string } {
    return MASTER_ATTR[item.master];
  }

  classicalMasterKey(master: ClassicalMaster): `classical.master.${ClassicalMaster}` {
    return `classical.master.${master}`;
  }
}
