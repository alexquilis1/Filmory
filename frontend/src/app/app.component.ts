import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './auth.service';
import {WatchlistService} from './services/watchlist/watchlist.service';
import {WatchlistItemCreate} from './models/watchlist-item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, RouterOutlet, FormsModule, LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  trendingMovies$: Observable<any> | undefined;

  title: string = '';
  searchType: string = 'movie';

  showLogin: boolean = false;
  showRegister: boolean = false;

  isLoggedIn: boolean = false;
  username: string = '';

  constructor(
    private http: HttpClient,
    protected router: Router,
    private authService: AuthService,
    private watchlistService: WatchlistService
  ) {
    this.trendingMovies$ = this.http.get<any>('http://localhost:3000/api/trending');

    this.updateLoginStatus();
  }

  updateLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = localStorage.getItem('username') || '';
      console.log('Email retrieved is this: ', this.username);
      console.log("Checking is working!!!")
    } else {
      this.username = '';
    }
  }

  openLogin(): void {
    this.showLogin = true;
    this.showRegister = false;
  }

  openRegister(): void {
    this.showRegister = true;
    this.showLogin = false;
  }

  closeModal(): void {
    this.showLogin = false;
    this.showRegister = false;
    window.location.reload();
  }

  onSearchSubmit(): void {
    if (!this.title) {
      alert('Please enter a movie or TV series title!');
      return;
    }

    const searchPath = this.searchType === 'movie'
      ? `/search-movie/${this.title}`
      : `/search-series/${this.title}`;

    window.open(searchPath);
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = '';
    this.router.navigate(['/']);
    window.location.reload();
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

    const isMovie = movieOrShow.title !== undefined;
    const isTvShow = movieOrShow.name !== undefined;

    if (!isMovie && !isTvShow) {
      console.log('Item is neither a movie nor a TV show.');
      alert('Invalid item type.');
      return;
    }

    const watchlistItem: WatchlistItemCreate = {
      tmdb_id: movieOrShow.id,
      type: isMovie ? 'movie' : 'tv',
      user_id: userId,
    };

    console.log('Watchlist item:', JSON.stringify(watchlistItem));

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
