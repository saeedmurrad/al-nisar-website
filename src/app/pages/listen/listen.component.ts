import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, effect, inject, signal, viewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideExternalLink, LucideHeadphones, LucidePause, LucidePlay, LucideSkipBack, LucideSkipForward } from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { AudioCatalogEntry, AudioEpisode, AudioSeries } from '../../models/content.models';

function formatDuration(sec: number | null): string {
  if (!sec || sec <= 0) return '—';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

@Component({
  selector: 'app-listen',
  imports: [
    RouterLink,
    FormsModule,
    LucideHeadphones,
    LucidePlay,
    LucidePause,
    LucideSkipBack,
    LucideSkipForward,
    LucideExternalLink,
  ],
  templateUrl: './listen.component.html',
})
export class ListenComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  readonly i18n = inject(TranslationService);
  readonly data = inject(DataService);

  readonly audioEl = viewChild<ElementRef<HTMLAudioElement>>('audioEl');

  readonly catalog = signal<AudioCatalogEntry[]>([]);
  readonly series = signal<AudioSeries | null>(null);
  readonly loading = signal(true);
  readonly failed = signal(false);
  readonly selectedEpisode = signal<number | null>(null);
  readonly playbackRate = signal(1);
  readonly isPlaying = signal(false);

  readonly seriesId = computed(() => this.route.snapshot.paramMap.get('seriesId'));

  readonly sortedEpisodes = computed(() => {
    const s = this.series();
    if (!s) return [];
    return [...s.episodes].sort((a, b) => a.episode - b.episode);
  });

  readonly currentEpisode = computed(() => {
    const ep = this.selectedEpisode();
    const episodes = this.sortedEpisodes();
    if (ep == null) return episodes[0] ?? null;
    return episodes.find((e) => e.episode === ep) ?? episodes[0] ?? null;
  });

  readonly totalDurationSec = computed(() =>
    this.sortedEpisodes().reduce((sum, e) => sum + (e.durationSec ?? 0), 0),
  );

  constructor() {
    this.route.paramMap.subscribe(() => this.load());

    effect(() => {
      const ep = this.currentEpisode();
      const s = this.series();
      if (!ep || !s || !isPlatformBrowser(this.platformId)) return;
      const url = this.data.resolveEpisodeAudioUrl(ep, s);
      const el = this.audioEl()?.nativeElement;
      if (!el || !url) return;
      if (el.src !== url) {
        el.src = url;
        el.load();
      }
      el.playbackRate = this.playbackRate();
    });
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    this.failed.set(false);
    this.series.set(null);
    this.catalog.set([]);

    try {
      const id = this.seriesId();
      if (!id) {
        this.catalog.set(await this.data.getAudioCatalog());
        return;
      }

      const s = await this.data.getAudioSeries(id);
      this.series.set(s);

      const saved = isPlatformBrowser(this.platformId)
        ? localStorage.getItem(`listen.${id}.episode`)
        : null;
      const savedEp = saved ? Number(saved) : null;
      const episodes = [...s.episodes].sort((a, b) => a.episode - b.episode);
      const initial =
        savedEp && episodes.some((e) => e.episode === savedEp)
          ? savedEp
          : (episodes[0]?.episode ?? null);
      this.selectedEpisode.set(initial);
    } catch {
      this.failed.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  catalogTitle(entry: AudioCatalogEntry): string {
    if (this.i18n.isUrdu() && entry.titleUr) return entry.titleUr;
    return entry.titleEn ?? entry.id;
  }

  seriesTitle(s: AudioSeries): string {
    return this.i18n.isUrdu() ? s.titleUr : s.titleEn;
  }

  episodeLabel(ep: AudioEpisode): string {
    return `${this.i18n.t('listen.part')} ${ep.episode}`;
  }

  episodeUrl(ep: AudioEpisode): string {
    const s = this.series();
    return s ? this.data.resolveEpisodeAudioUrl(ep, s) : '';
  }

  formatDuration(sec: number | null): string {
    return formatDuration(sec);
  }

  selectEpisode(ep: AudioEpisode): void {
    this.selectedEpisode.set(ep.episode);
    const id = this.seriesId();
    if (id && isPlatformBrowser(this.platformId)) {
      localStorage.setItem(`listen.${id}.episode`, String(ep.episode));
    }
    queueMicrotask(() => {
      const el = this.audioEl()?.nativeElement;
      el?.play().catch(() => undefined);
    });
  }

  playPause(): void {
    const el = this.audioEl()?.nativeElement;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  }

  onAudioPlay(): void {
    this.isPlaying.set(true);
  }

  onAudioPause(): void {
    this.isPlaying.set(false);
  }

  previousEpisode(): void {
    const episodes = this.sortedEpisodes();
    const current = this.currentEpisode();
    if (!current || episodes.length === 0) return;
    const idx = episodes.findIndex((e) => e.episode === current.episode);
    if (idx > 0) this.selectEpisode(episodes[idx - 1]);
  }

  nextEpisode(): void {
    const episodes = this.sortedEpisodes();
    const current = this.currentEpisode();
    if (!current || episodes.length === 0) return;
    const idx = episodes.findIndex((e) => e.episode === current.episode);
    if (idx >= 0 && idx < episodes.length - 1) this.selectEpisode(episodes[idx + 1]);
  }

  onEnded(): void {
    this.nextEpisode();
  }

  setRate(rate: number): void {
    this.playbackRate.set(rate);
    const el = this.audioEl()?.nativeElement;
    if (el) el.playbackRate = rate;
  }
}
