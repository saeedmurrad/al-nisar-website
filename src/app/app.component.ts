import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
export class App {
  readonly i18n = inject(TranslationService);
}
