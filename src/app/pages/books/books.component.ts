import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideBookOpen, LucideSearch } from '@lucide/angular';
import { DataService } from '../../core/services/data.service';
import { TranslationService } from '../../core/services/translation.service';
import { Book } from '../../models/content.models';

@Component({
  selector: 'app-books',
  imports: [FormsModule, RouterLink, LucideSearch, LucideBookOpen],
  templateUrl: './books.component.html',
})
export class BooksComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly i18n = inject(TranslationService);
  readonly data = inject(DataService);

  readonly searchQuery = signal('');
  readonly all = signal<Book[]>([]);
  readonly loading = signal(true);
  readonly failed = signal(false);

  readonly filtered = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.all();
    return this.all().filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.titleUrdu.includes(this.searchQuery().trim()) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q),
    );
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.data
        .getBooks()
        .then((items) => this.all.set(items))
        .catch(() => this.failed.set(true))
        .finally(() => this.loading.set(false));
    }
  }

  onSearch(value: string): void {
    this.searchQuery.set(value);
  }

  displayTitle(book: Book): string {
    return this.i18n.isUrdu() && book.titleUrdu ? book.titleUrdu : book.title;
  }
}
