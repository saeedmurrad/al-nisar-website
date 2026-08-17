import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideSearch } from '@lucide/angular';
import { TranslationService } from '../../core/services/translation.service';
import { GLOSSARY_ENTRIES, GlossaryEntry } from '../../data/glossary.data';

@Component({
  selector: 'app-glossary',
  imports: [FormsModule, RouterLink, LucideSearch],
  templateUrl: './glossary.component.html',
})
export class GlossaryComponent {
  readonly i18n = inject(TranslationService);
  readonly query = signal('');

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const items = [...GLOSSARY_ENTRIES];
    if (this.i18n.isUrdu()) {
      items.sort((a, b) => a.termUr.localeCompare(b.termUr, 'ur'));
    } else {
      items.sort((a, b) => a.termEn.localeCompare(b.termEn, 'en'));
    }
    if (!q) return items;
    return items.filter((e) => {
      const hay = `${e.termEn} ${e.termUr} ${e.aliasesEn.join(' ')} ${e.aliasesUr.join(' ')} ${e.bodyEn} ${e.bodyUr}`.toLowerCase();
      return hay.includes(q) || e.termUr.includes(this.query().trim());
    });
  });

  term(entry: GlossaryEntry): string {
    return this.i18n.isUrdu() ? entry.termUr : entry.termEn;
  }

  body(entry: GlossaryEntry): string {
    return this.i18n.isUrdu() ? entry.bodyUr : entry.bodyEn;
  }

  onSearch(value: string): void {
    this.query.set(value);
  }
}
