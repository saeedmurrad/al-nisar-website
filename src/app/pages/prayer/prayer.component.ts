import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideClock,
  LucideMapPin,
  LucideNavigation,
} from '@lucide/angular';
import {
  CalendarDayCell,
  DayPrayerTimes,
  PrayerCoords,
  PrayerName,
  PrayerService,
} from '../../core/services/prayer.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-prayer',
  imports: [
    LucideChevronLeft,
    LucideChevronRight,
    LucideClock,
    LucideMapPin,
    LucideNavigation,
  ],
  templateUrl: './prayer.component.html',
})
export class PrayerComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  readonly prayer = inject(PrayerService);

  readonly coords = signal<PrayerCoords>(this.prayer.defaultCoords);
  readonly locating = signal(false);
  readonly locateFailed = signal(false);
  readonly selected = signal(new Date());
  readonly viewYear = signal(new Date().getFullYear());
  readonly viewMonth = signal(new Date().getMonth() + 1);

  readonly times = computed(() => this.prayer.timesFor(this.selected(), this.coords()));
  readonly next = computed(() =>
    this.prayer.nextPrayer(new Date(), this.prayer.timesFor(new Date(), this.coords()), this.coords()),
  );

  readonly grid = computed(() =>
    this.prayer.monthGrid(
      this.viewYear(),
      this.viewMonth(),
      this.selected(),
      this.coords().timeZone,
    ),
  );

  readonly monthLabel = computed(() => {
    const d = this.prayer.dateAtYmd(this.viewYear(), this.viewMonth(), 1);
    return new Intl.DateTimeFormat(this.i18n.isUrdu() ? 'ur-PK' : 'en-GB', {
      month: 'long',
      year: 'numeric',
    }).format(d);
  });

  readonly gregorianLabel = computed(() =>
    this.prayer.formatGregorian(
      this.selected(),
      this.coords().timeZone,
      this.i18n.isUrdu() ? 'ur-PK' : 'en-GB',
    ),
  );

  readonly hijriLabel = computed(() =>
    this.prayer.formatHijri(
      this.selected(),
      this.coords().timeZone,
      this.i18n.isUrdu() ? 'ur-PK' : 'en-GB',
    ),
  );

  readonly locationLabel = computed(() =>
    this.i18n.isUrdu() ? this.coords().labelUr : this.coords().labelEn,
  );

  readonly weekdayLabels = computed(() => {
    const locale = this.i18n.isUrdu() ? 'ur-PK' : 'en-GB';
    const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    // Sunday-start week to match monthGrid
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(2024, 0, 7 + i); // 7 Jan 2024 = Sunday
      return fmt.format(d);
    });
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = this.prayer.loadSavedCoords();
      if (saved) this.coords.set(saved);
      const now = new Date();
      const ymd = this.prayer.ymdInTimeZone(now, this.coords().timeZone);
      this.selected.set(this.prayer.dateAtYmd(ymd.y, ymd.m, ymd.d));
      this.viewYear.set(ymd.y);
      this.viewMonth.set(ymd.m);
    }
  }

  timeLabel(name: PrayerName, times: DayPrayerTimes): string {
    return this.prayer.formatTime(
      times[name],
      this.coords().timeZone,
      this.i18n.isUrdu() ? 'ur-PK' : 'en-GB',
    );
  }

  prayerKey(name: PrayerName): `prayer.name.${PrayerName}` {
    return `prayer.name.${name}`;
  }

  selectDay(cell: CalendarDayCell): void {
    this.selected.set(cell.date);
    if (!cell.inMonth) {
      const ymd = this.prayer.ymdInTimeZone(cell.date, this.coords().timeZone);
      this.viewYear.set(ymd.y);
      this.viewMonth.set(ymd.m);
    }
  }

  prevMonth(): void {
    let m = this.viewMonth() - 1;
    let y = this.viewYear();
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    this.viewMonth.set(m);
    this.viewYear.set(y);
  }

  nextMonth(): void {
    let m = this.viewMonth() + 1;
    let y = this.viewYear();
    if (m > 12) {
      m = 1;
      y += 1;
    }
    this.viewMonth.set(m);
    this.viewYear.set(y);
  }

  async useMyLocation(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    this.locating.set(true);
    this.locateFailed.set(false);
    try {
      const coords = await this.prayer.requestDeviceLocation();
      this.coords.set(coords);
      const now = new Date();
      const ymd = this.prayer.ymdInTimeZone(now, coords.timeZone);
      this.selected.set(this.prayer.dateAtYmd(ymd.y, ymd.m, ymd.d));
      this.viewYear.set(ymd.y);
      this.viewMonth.set(ymd.m);
    } catch {
      this.locateFailed.set(true);
    } finally {
      this.locating.set(false);
    }
  }

  useBurewala(): void {
    this.prayer.clearSavedCoords();
    this.coords.set(this.prayer.defaultCoords);
    this.locateFailed.set(false);
  }
}
