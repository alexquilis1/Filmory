// watchll

import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { AuthService} from '../../auth.service';
import {Movie, TvShow, WatchlistItem, WatchlistItemCreate} from '../../models/watchlist-item.model';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { SearchService } from '../../services/search/search.service';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe
  ],
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnInit {

  watchlist: WatchlistItem[] = [];
  isLoggedIn: boolean = false;
  results: any[] = [];

  constructor(private watchlistService: WatchlistService, private authService: AuthService, private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loadWatchlist();
    } else {
      console.error('User is not logged in.')
    }
  }

  loadWatchlist(): void {
    const token = this.authService.getToken();  // Obtener el token del servicio de autenticación

    if (token) {
      this.watchlistService.getWatchlist(token).subscribe((items) => {
        // Recorrer cada item y obtener los detalles (película o serie)
        for (let item of items) {
          if (item.type === 'movie') {
            this.searchService.searchMovieById(item.tmdb_id).subscribe(
              (movieDetails) => {
                // Agregar el item con los detalles completos de la película
                this.watchlist.push({ ...item, ...movieDetails });
              },
              (error) => {
                console.error(`Error fetching movie details for item ${item.tmdb_id}:`, error);
              }
            );
          } else if (item.type === 'tv') {
            this.searchService.searchTvShowById(item.tmdb_id).subscribe(
              (tvShowDetails) => {
                // Agregar el item con los detalles completos de la serie
                this.watchlist.push({ ...item, ...tvShowDetails });
              },
              (error) => {
                console.error(`Error fetching TV show details for item ${item.tmdb_id}:`, error);
              }
            );
          } else {
            console.warn(`Unknown type`);
            this.watchlist.push(item);  // Si no es ni película ni serie, simplemente agregar el item tal cual
          }
        }
      });
    } else {
      // Manejar el caso donde no se encuentra el token
      console.error('No token found');
    }
  }


  addToWatchlist(item: WatchlistItemCreate, token: string): void {
    this.watchlistService.addToWatchlist(item, token).subscribe((newItem) => {
      console.log('New item received:', newItem);
      this.watchlist.push(newItem);
    });
  }

  deleteWatchlistItem(id: number): void {
    const token = this.authService.getToken();
    if (token) {
      this.watchlistService.deleteWatchlistItem(id, token).subscribe((deletedItem) => {
        this.watchlist = this.watchlist.filter(item => item.id !== deletedItem.id);
      });
    } else {
      console.error('No token found');
    }

  }

  updateWatchedStatus(id: number, watched: boolean): void {
    const token = this.authService.getToken();
    if (token) {
      this.watchlistService.updateWatchlistStatus(id, watched, token).subscribe((updatedItem) => {
        const index = this.watchlist.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
          this.watchlist[index] = updatedItem;
        }
      });
    } else {
      console.error('No token found');
    }

  }

  // Toggle watched status of an item
  toggleWatchedStatus(item: WatchlistItem): void {
    const updatedWatchedStatus = !item.watched;  // Toggle watched status
    this.watchlistService.updateWatchlistStatus(item.id, updatedWatchedStatus, this.authService.getToken()).subscribe(
      (updatedItem) => {
        item.watched = updatedItem.watched;  // Update local item with the new status
      },
      (error) => {
        console.error('Error updating watched status:', error);
      }
    );
  }

  // Remove item from watchlist
  removeFromWatchlist(item: WatchlistItem): void {
    this.watchlistService.deleteWatchlistItem(item.id, this.authService.getToken()).subscribe(
      () => {
        const index = this.watchlist.indexOf(item);
        if (index > -1) {
          this.watchlist.splice(index, 1);  // Remove item from local watchlist array
        }
      },
      (error) => {
        console.error('Error removing item from watchlist:', error);
      }
    );
  }

}
