import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideCalendar, LucideExternalLink, LucideMapPin, LucideRadio } from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { EventType, SiteEvent } from '../../models/content.models';

@Component({
  selector: 'app-events',
  imports: [RouterLink, LucideCalendar, LucideMapPin, LucideExternalLink, LucideRadio],
  templateUrl: './events.component.html',
})
export class EventsComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  private readonly data = inject(DataService);

  readonly events = signal<SiteEvent[]>([]);
  readonly loading = signal(true);
  readonly failed = signal(false);

  readonly upcoming = computed(() => {
    const now = Date.now();
    return this.events().filter((e) => new Date(e.startsAt).getTime() >= now);
  });

  readonly past = computed(() => {
    const now = Date.now();
    return [...this.events()]
      .filter((e) => new Date(e.startsAt).getTime() < now)
      .reverse();
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getEvents()
        .then((items) => this.events.set(items))
        .catch(() => this.failed.set(true))
        .finally(() => this.loading.set(false));
    }
  }

  typeKey(type: EventType): `events.type.${EventType}` {
    return `events.type.${type}`;
  }

  title(event: SiteEvent): string {
    return this.i18n.isUrdu() ? event.titleUr : event.titleEn;
  }

  description(event: SiteEvent): string {
    return this.i18n.isUrdu() ? event.descriptionUr : event.descriptionEn;
  }

  location(event: SiteEvent): string {
    return this.i18n.isUrdu() ? event.locationUr : event.locationEn;
  }

  formatWhen(iso: string): string {
    try {
      return new Intl.DateTimeFormat(this.i18n.isUrdu() ? 'ur-PK' : 'en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  eventLink(event: SiteEvent): string | null {
    if (!event.link) return null;
    return event.link.startsWith('http') ? event.link : event.link;
  }

  isExternal(link: string): boolean {
    return link.startsWith('http');
  }
}
