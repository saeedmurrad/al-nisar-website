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
    // Member Portal lives on its own site; anyone hitting /login is forwarded there.
    path: 'login',
    loadComponent: () =>
      import('./pages/portal-redirect/portal-redirect.component').then(
        (m) => m.PortalRedirectComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
