import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LucideExternalLink, LucidePlay } from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { SocialVideo } from '../../models/content.models';

@Component({
  selector: 'app-videos',
  imports: [DatePipe, LucidePlay, LucideExternalLink],
  templateUrl: './videos.component.html',
})
export class VideosComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);
  readonly i18n = inject(TranslationService);
  readonly data = inject(DataService);

  readonly videos = signal<SocialVideo[]>([]);
  readonly loading = signal(true);
  readonly failed = signal(false);
  readonly selected = signal<SocialVideo | null>(null);
  readonly channelUrl = signal('https://www.youtube.com/@sufinisarahmad159');
  readonly facebookUrl = signal('https://www.facebook.com/SufiNisarAhmad');

  /** Facebook's official Page Plugin — shows the page's newest posts and videos, playable inline. */
  readonly facebookEmbedUrl = computed<SafeResourceUrl>(() => {
    const params = new URLSearchParams({
      href: this.facebookUrl(),
      tabs: 'timeline',
      width: '500',
      height: '640',
      small_header: 'true',
      adapt_container_width: 'true',
      hide_cover: 'false',
      show_facepile: 'false',
    });
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.facebook.com/plugins/page.php?${params}`,
    );
  });

  readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const video = this.selected();
    if (!video) return null;
    // youtube-nocookie embed URLs are a fixed, trusted pattern built from the feed's video ID.
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.data.videoEmbedUrl(video.id),
    );
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getVideos()
        .then((videos) => {
          this.videos.set(videos);
          this.selected.set(videos[0] ?? null);
          this.failed.set(videos.length === 0);
        })
        .catch(() => this.failed.set(true))
        .finally(() => this.loading.set(false));
      this.data.getSocialLinks().then((links) => {
        this.channelUrl.set(links.youtubeChannelUrl);
        this.facebookUrl.set(links.facebookPageUrl);
      });
    }
  }

  play(video: SocialVideo): void {
    this.selected.set(video);
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('video-player')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }
}
