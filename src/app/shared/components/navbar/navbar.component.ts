import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideLogIn, LucideMenu, LucideX } from '@lucide/angular';
import { TranslationService } from '../../../core/services/translation.service';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LanguageToggleComponent, LucideMenu, LucideX, LucideLogIn],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly i18n = inject(TranslationService);
  readonly menuOpen = signal(false);

  readonly links = [
    { path: '/', key: 'nav.home' as const, exact: true },
    { path: '/irshadat', key: 'nav.irshadat' as const, exact: false },
    { path: '/shajra', key: 'nav.shajra' as const, exact: false },
    { path: '/gallery', key: 'nav.gallery' as const, exact: false },
    { path: '/books', key: 'nav.books' as const, exact: false },
    { path: '/videos', key: 'nav.videos' as const, exact: false },
  ];

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
