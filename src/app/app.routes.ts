import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'irshadat',
    loadComponent: () =>
      import('./pages/irshadat/irshadat.component').then((m) => m.IrshadatComponent),
  },
  {
    path: 'shajra',
    loadComponent: () =>
      import('./pages/shajra/shajra.component').then((m) => m.ShajraComponent),
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent),
  },
  {
    path: 'videos',
    loadComponent: () =>
      import('./pages/videos/videos.component').then((m) => m.VideosComponent),
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./pages/books/books.component').then((m) => m.BooksComponent),
  },
  {
    path: 'books/:id',
    loadComponent: () =>
      import('./pages/books/book-reader.component').then((m) => m.BookReaderComponent),
  },
  {
    // Member Portal lives on its own site; anyone hitting /login is forwarded there.
    path: 'login',
    loadComponent: () =>
      import('./pages/portal-redirect/portal-redirect.component').then(
        (m) => m.PortalRedirectComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
