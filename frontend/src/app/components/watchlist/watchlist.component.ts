import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist/watchlist.service';
import { AuthService } from '../../auth.service';
import { WatchlistItem, WatchlistItemCreate } from '../../models/watchlist-item.model';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { SearchService } from '../../services/search/search.service';
import { FormsModule } from '@angular/forms';
import {catchError, forkJoin, map, of, switchMap} from 'rxjs';
import {WatchlistMoviesGridComponent} from '../watchlist-movies-grid/watchlist-movies-grid.component';
import {WatchlistSeriesGridComponent} from '../watchlist-series-grid/watchlist-series-grid.component';
import { WatchlistChartComponent } from '../watchlist-chart/watchlist-chart.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    FormsModule,
    WatchlistMoviesGridComponent,
    WatchlistSeriesGridComponent,
    WatchlistChartComponent
  ],
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: WatchlistItem[] = [];
  isLoggedIn: boolean = false;
  results: any[] = [];
  showRatingDialog: boolean = false;
  selectedItem: WatchlistItem | null = null;
  rating: number = 0;
  comment: string = '';
  isLoading: boolean = false;
  enrichedWatchlist: any[] = [];

  constructor(
    private watchlistService: WatchlistService,
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loadWatchlist();
    } else {
      console.error('User is not logged in.');
    }
  }

  openRatingDialog(item: WatchlistItem): void {
    this.selectedItem = item;
    this.rating = item.user_rating || 0;
    this.comment = item.comments || '';
    this.showRatingDialog = true;
  }

  closeRatingDialog(): void {
    this.showRatingDialog = false;
  }

  saveRating(): void {
    const token = this.authService.getToken();
    if (token) {
      if (this.selectedItem) {
        // Check if both rating and comment are provided when watched is true
        if (this.rating === 0 || this.comment.trim() === '') {
          console.error('Rating and comment are required when watched is true');
          return;
        }
        this.selectedItem.user_rating = this.rating;
        this.selectedItem.comments = this.comment;

        this.watchlistService.updateWatchlistStatus(
          this.selectedItem.id,
          true, // Mark as watched
          this.rating,
          this.comment,
          token
        ).subscribe(
          (updatedItem: WatchlistItem) => {
            console.log('Response from server:', updatedItem);
            const index = this.watchlist.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
              this.watchlist[index] = updatedItem;
            }
            this.showRatingDialog = false;
            window.location.reload();
          },
          (error) => {
            console.error('Error updating watched status:', error);
          }
        );
      }
    }
    else {
      console.error('No token found');
    }
  }


  loadWatchlist(): void {
    const token = this.authService.getToken();

    if (!token) {
      console.error('No token found');
      return;
    }

    this.isLoading = true;

    this.watchlistService.getWatchlist(token).pipe(
      switchMap((items: WatchlistItem[]) => {
        const detailObservables = items.map(item => this.getDetails(item));
        return forkJoin(detailObservables);
      })
    ).subscribe(
      (detailedItems: (any | null)[]) => {
        this.watchlist = detailedItems.filter(item => item !== null);
        this.enrichedWatchlist = detailedItems.filter(item => item !== null);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching watchlist:', error);
        this.isLoading = false;
      }
    );
  }

  getDetails(item: WatchlistItem) {
    if (item.type === 'movie') {
      return this.searchService.searchMovieById(item.tmdb_id).pipe(
        map(movieDetails => ({ ...item, ...movieDetails })),
        catchError(error => {
          console.error(`Error fetching movie details for item ${item.tmdb_id}:`, error);
          return of(null);
        })
      );
    } else if (item.type === 'tv') {
      return this.searchService.searchTvShowById(item.tmdb_id).pipe(
        map(tvShowDetails => ({ ...item, ...tvShowDetails })),
        catchError(error => {
          console.error(`Error fetching TV show details for item ${item.tmdb_id}:`, error);
          return of(null);
        })
      );
    } else {
      return of(null);
    }
  }

  addToWatchlist(item: WatchlistItemCreate, token: string): void {
    this.watchlistService.addToWatchlist(item, token).subscribe((newItem) => {
      console.log('New item received:', newItem);
      this.watchlist.push(newItem);
    });
  }

  toggleWatchedStatus(item: WatchlistItem): void {
    this.openRatingDialog(item);
  }

  removeFromWatchlist(item: WatchlistItem): void {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      this.watchlistService.deleteWatchlistItem(item.id, this.authService.getToken()).subscribe(
        () => {
          const index = this.watchlist.indexOf(item);
          if (index > -1) {
            this.watchlist.splice(index, 1);
            console.log(`Item with ID ${item.id} removed successfully.`);
            window.location.reload();
          }
        },
        (error) => {
          console.error('Error removing item from watchlist:', error);
        }
      );
    }
  }

  get topRatedMovies() {
    return this.enrichedWatchlist.filter(item => item.type === 'movie' && item.user_rating >= 8);
  }

  get topRatedSeries() {
    return this.enrichedWatchlist.filter(item => item.type === 'tv' && item.user_rating >= 8);
  }

}
