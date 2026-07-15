import { RenderMode, ServerRoute } from '@angular/ssr';

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
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
