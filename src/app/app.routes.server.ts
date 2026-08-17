import { RenderMode, ServerRoute } from '@angular/ssr';
import { GLOSSARY_ENTRIES } from './data/glossary.data';

export const serverRoutes: ServerRoute[] = [
  // Book IDs are dynamic (from Firestore); render on the client.
  {
    path: 'books/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'listen/:seriesId',
    renderMode: RenderMode.Client,
  },
  {
    path: 'search',
    renderMode: RenderMode.Client,
  },
  {
    path: 'glossary/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return GLOSSARY_ENTRIES.map((e) => ({ slug: e.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
