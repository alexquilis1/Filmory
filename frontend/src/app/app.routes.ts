import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'trending',
    pathMatch: 'full' // Redirige a 'trending' por defecto
  },
  {
    path: 'search-movie/:title',
    loadComponent: () =>
      import('./components/search-movie/search-movie.component').then(
        (m) => m.SearchMovieComponent
      ),
  },
  {
    path: 'search-series/:title',
    loadComponent: () =>
      import('./components/search-series/search-series.component').then(
        (m) => m.SearchSeriesComponent
      ),
  },
  {
    path: 'watchlist',
    loadComponent: () =>
      import('./components/watchlist/watchlist.component').then(
        (m) => m.WatchlistComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'trending' // Ruta de fallback
  },
];
