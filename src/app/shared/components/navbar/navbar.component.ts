import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideChevronDown,
  LucideLogIn,
  LucideMapPin,
  LucideMenu,
  LucideMessageCircle,
  LucidePhone,
  LucideSearch,
  LucideX,
} from '@lucide/angular';
import { CONTACT } from '../../../data/contact.data';
import { TranslationService } from '../../../core/services/translation.service';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';

type DictKey = Parameters<TranslationService['t']>[0];

interface NavLink {
  path: string;
  key: DictKey;
  exact: boolean;
}

interface NavItem {
  key: DictKey;
  link?: NavLink;
  children?: NavLink[];
}

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    LanguageToggleComponent,
    LucideChevronDown,
    LucideMenu,
    LucideX,
    LucideLogIn,
    LucidePhone,
    LucideSearch,
    LucideMessageCircle,
    LucideMapPin,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly i18n = inject(TranslationService);
  readonly contact = CONTACT;
  readonly menuOpen = signal(false);
  readonly openGroup = signal<string | null>(null);

  readonly navItems: NavItem[] = [
    { key: 'nav.home', link: { path: '/', key: 'nav.home', exact: true } },
    {
      key: 'nav.group.teachings',
      children: [
        { path: '/irshadat', key: 'nav.irshadat', exact: false },
        { path: '/classical-irshadat', key: 'nav.classicalIrshadat', exact: false },
        { path: '/faq', key: 'nav.faq', exact: false },
        { path: '/shajra', key: 'nav.shajra', exact: false },
      ],
    },
    {
      key: 'nav.group.path',
      children: [
        { path: '/bayat', key: 'nav.bayat', exact: false },
        { path: '/events', key: 'nav.events', exact: false },
      ],
    },
    {
      key: 'nav.group.media',
      children: [
        { path: '/listen', key: 'nav.listen', exact: false },
        { path: '/videos', key: 'nav.videos', exact: false },
        { path: '/books', key: 'nav.books', exact: false },
        { path: '/gallery', key: 'nav.gallery', exact: false },
      ],
    },
  ];

  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.clearCloseTimer();
    this.menuOpen.set(false);
    this.openGroup.set(null);
  }

  openDropdown(key: string): void {
    this.clearCloseTimer();
    this.openGroup.set(key);
  }

  closeDropdown(): void {
    this.clearCloseTimer();
    // Brief delay so the pointer can cross into the submenu without it vanishing.
    this.closeTimer = setTimeout(() => {
      this.openGroup.set(null);
      this.closeTimer = null;
    }, 150);
  }

  toggleGroup(key: string): void {
    this.clearCloseTimer();
    this.openGroup.update((current) => (current === key ? null : key));
  }

  private clearCloseTimer(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
}
