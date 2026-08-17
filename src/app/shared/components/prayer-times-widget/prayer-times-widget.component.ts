import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideClock, LucideMapPin, LucideNavigation } from '@lucide/angular';
import {
  DayPrayerTimes,
  PrayerCoords,
  PrayerName,
  PrayerService,
} from '../../../core/services/prayer.service';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-prayer-times-widget',
  imports: [RouterLink, LucideClock, LucideMapPin, LucideNavigation],
  templateUrl: './prayer-times-widget.component.html',
})
export class PrayerTimesWidgetComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  readonly prayer = inject(PrayerService);

  readonly coords = signal<PrayerCoords>(this.prayer.defaultCoords);
  readonly locating = signal(false);
  readonly locateFailed = signal(false);
  readonly now = signal(new Date());

  readonly times = computed(() => this.prayer.timesFor(this.now(), this.coords()));
  readonly next = computed(() => this.prayer.nextPrayer(this.now(), this.times(), this.coords()));

  readonly gregorianLabel = computed(() =>
    this.prayer.formatGregorian(
      this.now(),
      this.coords().timeZone,
      this.i18n.isUrdu() ? 'ur-PK' : 'en-GB',
    ),
  );

  readonly hijriLabel = computed(() =>
    this.prayer.formatHijri(
      this.now(),
      this.coords().timeZone,
      this.i18n.isUrdu() ? 'ur-PK' : 'en-GB',
    ),
  );

  readonly locationLabel = computed(() =>
    this.i18n.isUrdu() ? this.coords().labelUr : this.coords().labelEn,
  );

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = this.prayer.loadSavedCoords();
      if (saved) this.coords.set(saved);
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

  async useMyLocation(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    this.locating.set(true);
    this.locateFailed.set(false);
    try {
      const coords = await this.prayer.requestDeviceLocation();
      this.coords.set(coords);
      this.now.set(new Date());
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
    this.now.set(new Date());
  }
}
