import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideSearch } from '@lucide/angular';
import { SearchService } from '../../core/services/search.service';
import { TranslationService } from '../../core/services/translation.service';
import { SearchResult, SearchResultType } from '../../models/content.models';

@Component({
  selector: 'app-search',
  imports: [FormsModule, RouterLink, LucideSearch],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  readonly i18n = inject(TranslationService);
  private readonly searchService = inject(SearchService);

  readonly query = signal('');
  readonly results = signal<SearchResult[]>([]);
  readonly searching = signal(false);
  readonly searched = signal(false);

  readonly resultTypes: SearchResultType[] = ['irshad', 'faq', 'book', 'classical'];

  readonly grouped = computed(() => {
    const map = new Map<SearchResultType, SearchResult[]>();
    for (const r of this.results()) {
      const list = map.get(r.type) ?? [];
      list.push(r);
      map.set(r.type, list);
    }
    return map;
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParamMap.subscribe((params) => {
        const q = params.get('q') ?? '';
        this.query.set(q);
        if (q.trim()) this.runSearch(q);
      });
    }
  }

  onSearch(value: string): void {
    this.query.set(value);
    if (value.trim().length >= 2) this.runSearch(value);
    else {
      this.results.set([]);
      this.searched.set(false);
    }
  }

  private async runSearch(q: string): Promise<void> {
    this.searching.set(true);
    try {
      const lang = this.i18n.lang();
      this.results.set(await this.searchService.search(q, lang));
      this.searched.set(true);
    } finally {
      this.searching.set(false);
    }
  }

  sectionKey(type: SearchResultType): `search.section.${SearchResultType}` {
    return `search.section.${type}`;
  }
}
