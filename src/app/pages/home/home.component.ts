import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  LucideBookOpen,
  LucideCalendar,
  LucideCirclePlay,
  LucideClock,
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
import { PrayerTimesWidgetComponent } from '../../shared/components/prayer-times-widget/prayer-times-widget.component';

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
  allama_iqbal: {
    en: 'Allama Muhammad Iqbal',
    ur: 'علامہ محمد اقبال',
  },
  rabia_basri: {
    en: 'Hazrat Rabia al-Adawiyya',
    ur: 'حضرت رابعہ بصری',
  },
  fariduddin_attar: {
    en: 'Fariduddin Attar',
    ur: 'فرید الدین عطار',
  },
  data_ganj_bakhsh: {
    en: 'Hazrat Data Ganj Bakhsh Ali Hujwiri',
    ur: 'حضرت داتا گنج بخش علی ہجویری',
  },
  moinuddin_chishti: {
    en: 'Khwaja Moinuddin Chishti',
    ur: 'خواجہ معین الدین چشتی',
  },
  junayd_baghdadi: {
    en: 'Hazrat Junayd of Baghdad',
    ur: 'حضرت جنید بغدادی',
  },
  hafez_shirazi: {
    en: 'Khwaja Hafez of Shiraz',
    ur: 'خواجہ حافظ شیرازی',
  },
};

const MADINA_FLIP_MS = 5000;

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    PrayerTimesWidgetComponent,
    LucideBookOpen,
    LucideCalendar,
    LucideCirclePlay,
    LucideClock,
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

  /** Blessed years for the birthday being celebrated this calendar year (born 11 Sep 1948). */
  readonly birthdayYears = new Date().getFullYear() - 1948;

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

  /** Set false to restore the Madina carousel as the first viewport. */
  readonly showBirthdayGiftHero = true;

  /** Falling petal shower sprites for the birthday gift hero. */
  readonly giftPetals = [
    { src: '/assets/images/gift/petal-pink.png', left: '3%', delay: '0s', duration: '12s', size: '2.6rem', drift: '-22px' },
    { src: '/assets/images/gift/petal-red.png', left: '11%', delay: '1.5s', duration: '14s', size: '2.2rem', drift: '26px' },
    { src: '/assets/images/gift/petal-gold.png', left: '19%', delay: '0.7s', duration: '13s', size: '2.4rem', drift: '-30px' },
    { src: '/assets/images/gift/petal-pink.png', left: '31%', delay: '2.4s', duration: '15s', size: '2.9rem', drift: '18px' },
    { src: '/assets/images/gift/petal-red.png', left: '42%', delay: '0.4s', duration: '11.5s', size: '2rem', drift: '-14px' },
    { src: '/assets/images/gift/petal-gold.png', left: '53%', delay: '1.9s', duration: '13.5s', size: '2.5rem', drift: '28px' },
    { src: '/assets/images/gift/petal-pink.png', left: '64%', delay: '1s', duration: '12.5s', size: '2.3rem', drift: '-24px' },
    { src: '/assets/images/gift/petal-red.png', left: '73%', delay: '2.9s', duration: '14.5s', size: '2.7rem', drift: '16px' },
    { src: '/assets/images/gift/petal-gold.png', left: '82%', delay: '1.2s', duration: '13s', size: '2rem', drift: '-28px' },
    { src: '/assets/images/gift/petal-pink.png', left: '90%', delay: '2.1s', duration: '15.5s', size: '2.5rem', drift: '20px' },
    { src: '/assets/images/gift/petal-red.png', left: '26%', delay: '3.5s', duration: '12s', size: '1.9rem', drift: '12px' },
    { src: '/assets/images/gift/petal-gold.png', left: '47%', delay: '4.1s', duration: '14s', size: '2.2rem', drift: '-18px' },
    { src: '/assets/images/gift/petal-pink.png', left: '61%', delay: '3.2s', duration: '13s', size: '2.6rem', drift: '22px' },
    { src: '/assets/images/gift/petal-red.png', left: '7%', delay: '4.7s', duration: '16s', size: '2.3rem', drift: '-26px' },
    { src: '/assets/images/gift/petal-gold.png', left: '95%', delay: '3.8s', duration: '12.8s', size: '2.1rem', drift: '14px' },
  ] as const;

  /** Soft twinkling lights (round glow dots — gold + white). */
  readonly giftStars = [
    { left: '5%', top: '10%', delay: '0s', duration: '1.8s', size: '0.7rem', tone: 'gold' as const },
    { left: '12%', top: '26%', delay: '0.35s', duration: '2.2s', size: '0.55rem', tone: 'white' as const },
    { left: '20%', top: '7%', delay: '0.9s', duration: '2s', size: '0.8rem', tone: 'white' as const },
    { left: '28%', top: '38%', delay: '0.55s', duration: '2.4s', size: '0.6rem', tone: 'gold' as const },
    { left: '38%', top: '12%', delay: '1.2s', duration: '1.7s', size: '0.65rem', tone: 'white' as const },
    { left: '48%', top: '4%', delay: '0.15s', duration: '2.1s', size: '0.7rem', tone: 'gold' as const },
    { left: '58%', top: '20%', delay: '1s', duration: '2.3s', size: '0.85rem', tone: 'white' as const },
    { left: '68%', top: '9%', delay: '0.7s', duration: '1.9s', size: '0.55rem', tone: 'gold' as const },
    { left: '76%', top: '30%', delay: '1.4s', duration: '2.2s', size: '0.65rem', tone: 'white' as const },
    { left: '84%', top: '14%', delay: '0.4s', duration: '2s', size: '0.75rem', tone: 'gold' as const },
    { left: '92%', top: '36%', delay: '1.1s', duration: '2.5s', size: '0.5rem', tone: 'white' as const },
    { left: '8%', top: '52%', delay: '1.6s', duration: '2.1s', size: '0.6rem', tone: 'gold' as const },
    { left: '22%', top: '60%', delay: '0.5s', duration: '2.6s', size: '0.7rem', tone: 'white' as const },
    { left: '45%', top: '56%', delay: '1.5s', duration: '1.8s', size: '0.55rem', tone: 'gold' as const },
    { left: '65%', top: '64%', delay: '0.8s', duration: '2.3s', size: '0.75rem', tone: 'white' as const },
    { left: '82%', top: '50%', delay: '1.9s', duration: '2s', size: '0.6rem', tone: 'gold' as const },
    { left: '15%', top: '76%', delay: '0.25s', duration: '2.7s', size: '0.55rem', tone: 'white' as const },
    { left: '36%', top: '80%', delay: '1.3s', duration: '1.9s', size: '0.8rem', tone: 'gold' as const },
    { left: '55%', top: '72%', delay: '1.7s', duration: '2.2s', size: '0.6rem', tone: 'white' as const },
    { left: '74%', top: '78%', delay: '0.65s', duration: '2.1s', size: '0.65rem', tone: 'gold' as const },
    { left: '90%', top: '68%', delay: '1.15s', duration: '2.4s', size: '0.5rem', tone: 'white' as const },
    { left: '3%', top: '40%', delay: '2s', duration: '1.9s', size: '0.7rem', tone: 'white' as const },
    { left: '96%', top: '22%', delay: '0.1s', duration: '2.3s', size: '0.6rem', tone: 'gold' as const },
    { left: '33%', top: '46%', delay: '1.55s', duration: '2s', size: '0.5rem', tone: 'white' as const },
  ] as const;

  /** Eastern Arabic digits for Urdu year display. */
  birthdayYearsLabel(): string {
    const n = String(this.birthdayYears);
    if (!this.i18n.isUrdu()) return n;
    return n.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!);
  }

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
      path: '/prayer',
      titleKey: 'nav.prayer' as const,
      bodyKey: 'home.explorePrayer' as const,
      icon: 'clock' as const,
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

    if (!this.showBirthdayGiftHero) {
      interval(MADINA_FLIP_MS)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.madinaSlide.update((i) => (i + 1) % this.madinaImages.length);
        });
    }
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
