import { Injectable } from '@angular/core';
import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'adhan';
import { CONTACT } from '../../data/contact.data';

export type PrayerName = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerCoords {
  latitude: number;
  longitude: number;
  timeZone: string;
  labelEn: string;
  labelUr: string;
  /** True when using device GPS rather than the default khanqah location. */
  isDevice: boolean;
}

export interface DayPrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

export interface NextPrayerInfo {
  name: PrayerName;
  at: Date;
}

export interface CalendarDayCell {
  gregorianDay: number;
  hijriDay: number;
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

const STORAGE_KEY = 'al-nisar-prayer-location';
const PRAYER_ORDER: PrayerName[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

@Injectable({ providedIn: 'root' })
export class PrayerService {
  readonly defaultCoords: PrayerCoords = {
    latitude: CONTACT.latitude,
    longitude: CONTACT.longitude,
    timeZone: CONTACT.timeZone,
    labelEn: CONTACT.locationLabelEn,
    labelUr: CONTACT.locationLabelUr,
    isDevice: false,
  };

  readonly prayerNames: readonly PrayerName[] = PRAYER_ORDER;

  timesFor(date: Date, coords: PrayerCoords): DayPrayerTimes {
    const { y, m, d } = this.ymdInTimeZone(date, coords.timeZone);
    const localNoon = new Date(y, m - 1, d, 12, 0, 0);
    const parameters = CalculationMethod.Karachi();
    parameters.madhab = Madhab.Hanafi;
    const pt = new PrayerTimes(
      new Coordinates(coords.latitude, coords.longitude),
      localNoon,
      parameters,
    );
    return {
      fajr: pt.fajr,
      sunrise: pt.sunrise,
      dhuhr: pt.dhuhr,
      asr: pt.asr,
      maghrib: pt.maghrib,
      isha: pt.isha,
    };
  }

  nextPrayer(now: Date, times: DayPrayerTimes, coords: PrayerCoords): NextPrayerInfo {
    for (const name of PRAYER_ORDER) {
      if (times[name].getTime() > now.getTime()) {
        return { name, at: times[name] };
      }
    }
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextDay = this.timesFor(tomorrow, coords);
    return { name: 'fajr', at: nextDay.fajr };
  }

  formatTime(date: Date, timeZone: string, locale: string): string {
    try {
      return new Intl.DateTimeFormat(locale, {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
      }).format(date);
    } catch {
      return date.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
    }
  }

  formatGregorian(date: Date, timeZone: string, locale: string): string {
    try {
      return new Intl.DateTimeFormat(locale, {
        timeZone,
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      return date.toLocaleDateString(locale);
    }
  }

  formatHijri(date: Date, timeZone: string, locale: string): string {
    const base = locale.startsWith('ur') ? 'ur-PK' : 'en-GB';
    try {
      return new Intl.DateTimeFormat(`${base}-u-ca-islamic-umalqura`, {
        timeZone,
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      try {
        return new Intl.DateTimeFormat(`${base}-u-ca-islamic`, {
          timeZone,
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(date);
      } catch {
        return '';
      }
    }
  }

  hijriDay(date: Date, timeZone: string): number {
    try {
      const parts = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
        timeZone,
        day: 'numeric',
      }).formatToParts(date);
      return Number(parts.find((p) => p.type === 'day')?.value ?? 0);
    } catch {
      return 0;
    }
  }

  ymdInTimeZone(date: Date, timeZone: string): { y: number; m: number; d: number } {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(date);
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
    return { y: get('year'), m: get('month'), d: get('day') };
  }

  /** Build a Date (local noon) for a Y/M/D in the given zone. */
  dateAtYmd(y: number, m: number, d: number): Date {
    return new Date(y, m - 1, d, 12, 0, 0);
  }

  monthGrid(
    year: number,
    month: number,
    selected: Date,
    timeZone: string,
    today: Date = new Date(),
  ): CalendarDayCell[] {
    const first = this.dateAtYmd(year, month, 1);
    const startWeekday = first.getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month, 0).getDate();
    const prevMonthDays = new Date(year, month - 1, 0).getDate();

    const todayYmd = this.ymdInTimeZone(today, timeZone);
    const selectedYmd = this.ymdInTimeZone(selected, timeZone);

    const cells: CalendarDayCell[] = [];

    for (let i = 0; i < startWeekday; i++) {
      const day = prevMonthDays - startWeekday + 1 + i;
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      const date = this.dateAtYmd(prevYear, prevMonth, day);
      cells.push({
        gregorianDay: day,
        hijriDay: this.hijriDay(date, timeZone),
        date,
        inMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = this.dateAtYmd(year, month, day);
      cells.push({
        gregorianDay: day,
        hijriDay: this.hijriDay(date, timeZone),
        date,
        inMonth: true,
        isToday: todayYmd.y === year && todayYmd.m === month && todayYmd.d === day,
        isSelected:
          selectedYmd.y === year && selectedYmd.m === month && selectedYmd.d === day,
      });
    }

    let trailing = 1;
    while (cells.length % 7 !== 0) {
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      const date = this.dateAtYmd(nextYear, nextMonth, trailing);
      cells.push({
        gregorianDay: trailing,
        hijriDay: this.hijriDay(date, timeZone),
        date,
        inMonth: false,
        isToday: false,
        isSelected: false,
      });
      trailing += 1;
    }

    return cells;
  }

  loadSavedCoords(): PrayerCoords | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<PrayerCoords>;
      if (
        typeof parsed.latitude !== 'number' ||
        typeof parsed.longitude !== 'number' ||
        typeof parsed.timeZone !== 'string'
      ) {
        return null;
      }
      return {
        latitude: parsed.latitude,
        longitude: parsed.longitude,
        timeZone: parsed.timeZone,
        labelEn: parsed.labelEn ?? 'My location',
        labelUr: parsed.labelUr ?? 'میری جگہ',
        isDevice: true,
      };
    } catch {
      return null;
    }
  }

  saveCoords(coords: PrayerCoords): void {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          latitude: coords.latitude,
          longitude: coords.longitude,
          timeZone: coords.timeZone,
          labelEn: coords.labelEn,
          labelUr: coords.labelUr,
        }),
      );
    } catch {
      /* private mode */
    }
  }

  clearSavedCoords(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  requestDeviceLocation(timeoutMs = 10000): Promise<PrayerCoords> {
    return new Promise((resolve, reject) => {
      if (typeof navigator === 'undefined' || !navigator.geolocation) {
        reject(new Error('Geolocation unavailable'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const timeZone =
            Intl.DateTimeFormat().resolvedOptions().timeZone || CONTACT.timeZone;
          const coords: PrayerCoords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            timeZone,
            labelEn: 'My location',
            labelUr: 'میری جگہ',
            isDevice: true,
          };
          this.saveCoords(coords);
          resolve(coords);
        },
        (err) => reject(err),
        { enableHighAccuracy: false, timeout: timeoutMs, maximumAge: 15 * 60 * 1000 },
      );
    });
  }
}
