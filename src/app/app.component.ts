import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AnalyticsService } from './core/services/analytics.service';
import { SeoService } from './core/services/seo.service';
import { TranslationService } from './core/services/translation.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MobileContactBarComponent } from './shared/components/mobile-contact-bar/mobile-contact-bar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, MobileContactBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App implements OnInit {
  readonly i18n = inject(TranslationService);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.analytics.init();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        const url = event.urlAfterRedirects;
        this.seo.applyForUrl(url);
        this.analytics.trackPageView(url);
      });
  }
}
