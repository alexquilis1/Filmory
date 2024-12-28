import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgForOf, NgIf } from '@angular/common';
import { WatchlistService } from '../../services/watchlist/watchlist.service';
import { AuthService } from '../../auth.service';
import { WatchlistItemCreate } from '../../models/watchlist-item.model';

@Component({
  selector: 'app-search-tv-series',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
  ],
  templateUrl: './search-series.component.html',
  styleUrls: ['./search-series.component.css']
})
export class SearchSeriesComponent implements OnInit {
  title: string | null = '';
  results: any[] = [];
  currentPage: number = 1;
  resultsPerPage: number = 6;
  paginatedResults: any[] = [];
  isLoggedIn: boolean = false;
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private watchlistService: WatchlistService
  ) {
    this.updateLoginStatus();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.title = params.get('title');
      if (this.title) {
        this.searchTVSeries(this.title);
      }
    });
  }

  searchTVSeries(title: string): void {
    const url = `http://localhost:3000/api/search-series/${title}`
    console.log('Fecthing from:', url)
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.results = response.results || [];
        this.sortByFirstAirDate();
        this.paginateResults();
      },
      error: (error) => {
        console.error('Error fetching movie:', error);
      },
    })
  }

  sortByFirstAirDate(): void {
    this.results.sort((a, b) => {
      const dateA = new Date(a.first_air_date);
      const dateB = new Date(b.first_air_date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  paginateResults(): void {
    const startIndex = (this.currentPage - 1) * this.resultsPerPage;
    const endIndex = startIndex + this.resultsPerPage;
    this.paginatedResults = this.results.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateResults();
    }
  }

  goToNextPage(): void {
    const totalPages = Math.ceil(this.results.length / this.resultsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.paginateResults();
    }
  }

  updateLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.email = localStorage.getItem('email') || '';
      console.log('Email retrieved is this: ', this.email);
      console.log("Checking is working!!!")
    } else {
      this.email = '';
    }
  }

  addToWatchlist(movieOrShow: any): void {
    const userId = this.authService.getUserId();
    console.log('Retrieved userId: ', userId)

    if (!userId) {
      console.log('User is not logged in.');
      alert('You must be logged in to add items to your watchlist.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      console.log('Authorization token is missing.');
      alert('You must be logged in to add items to your watchlist.');
      return;
    }

    const watchlistItem: WatchlistItemCreate = {
      tmdb_id: movieOrShow.id,
      type: 'tv',
      user_id: userId,
    };


    this.watchlistService.addToWatchlist(watchlistItem, token).subscribe(
      (newItem) => {
        console.log('Successfully added to watchlist:', newItem);
        alert('A new item has been added to your watchlist!');
      },
      (error) => {
        console.error('Error adding to watchlist:', error);

        if (error.status === 401) {
          console.error('Unauthorized: Authorization token required or invalid.');
          alert('Authorization token is missing or invalid. Please log in again.');
        } else if (error.status === 400) {
          console.error('Bad Request: Check the payload or request format.');
          alert('Failed to add to watchlist due to bad request. Please verify the input.');
        } else if (error.status === 500) {
          const backendError = error?.error;
          console.error('Internal Server Error details:', backendError);
          if (backendError?.detail) {
            alert(`Failed to add to watchlist: ${backendError.detail}`);
          } else {
            alert('Failed to add to watchlist due to an internal server error.');
          }
        } else {
          console.error('Unhandled error:', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    );
  }

}
