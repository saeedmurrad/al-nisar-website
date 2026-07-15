import { Injectable, inject } from '@angular/core';
import { DataService } from './data.service';
import { FAQ_ITEMS } from '../../data/faq.data';
import { SearchResult, SearchResultType } from '../../models/content.models';

function snippet(text: string, max = 120): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trimEnd() + '…';
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly data = inject(DataService);

  async search(query: string, lang: 'en' | 'ur'): Promise<SearchResult[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const [irshadat, books, classical] = await Promise.all([
      this.data.getIrshadat(),
      this.data.getBooks(),
      this.data.getClassicalIrshadat(),
    ]);

    const irshadMap = new Map(irshadat.map((i) => [i.id, i]));
    const results: SearchResult[] = [];

    for (const item of irshadat) {
      const hay = `${item.en} ${item.ur} ${item.dateLabel}`.toLowerCase();
      if (!hay.includes(q)) continue;
      results.push({
        type: 'irshad',
        id: item.id,
        title: lang === 'ur' ? 'ارشاد' : 'Irshad',
        snippet: snippet(lang === 'ur' ? item.ur : item.en || item.ur),
        route: '/irshadat',
      });
    }

    for (const item of FAQ_ITEMS) {
      const irshad = irshadMap.get(item.irshadId);
      if (!irshad) continue;
      const hay = `${item.questionEn} ${item.questionUr} ${irshad.en} ${irshad.ur}`.toLowerCase();
      if (!hay.includes(q)) continue;
      results.push({
        type: 'faq',
        id: item.id,
        title: lang === 'ur' ? item.questionUr : item.questionEn,
        snippet: snippet(lang === 'ur' ? irshad.ur : irshad.en || irshad.ur),
        route: '/faq',
      });
    }

    for (const book of books) {
      const hay = `${book.title} ${book.titleUrdu} ${book.author} ${book.category} ${book.description}`.toLowerCase();
      if (!hay.includes(q)) continue;
      results.push({
        type: 'book',
        id: book.id,
        title: lang === 'ur' && book.titleUrdu ? book.titleUrdu : book.title,
        snippet: snippet(book.description || book.author),
        route: `/books/${book.id}`,
      });
    }

    for (const saying of classical) {
      const hay = `${saying.en} ${saying.ur} ${saying.master}`.toLowerCase();
      if (!hay.includes(q)) continue;
      results.push({
        type: 'classical',
        id: saying.id,
        title: lang === 'ur' ? 'قولِ صوفیاء' : 'Sufi Saying',
        snippet: snippet(lang === 'ur' ? saying.ur : saying.en),
        route: '/classical-irshadat',
      });
    }

    const order: SearchResultType[] = ['irshad', 'faq', 'book', 'classical'];
    results.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
    return results.slice(0, 40);
  }
}
