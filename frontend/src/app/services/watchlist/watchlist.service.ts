import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { WatchlistItem, WatchlistItemCreate } from '../../models/watchlist-item.model';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private baseUrl = 'http://localhost:3000/api/watchlist';

  constructor(private http: HttpClient) {}

  getWatchlist(token: string): Observable<WatchlistItem[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<WatchlistItem[]>(this.baseUrl, { headers });
  }

  addToWatchlist(watchlistItem: WatchlistItemCreate, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/add`, watchlistItem, { headers });
  }

  deleteWatchlistItem(id: number, token: string): Observable<WatchlistItem> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<WatchlistItem>(`${this.baseUrl}/${id}/delete`, { headers });
  }

  updateWatchlistStatus(id: number, watched: boolean, rating: number, comment: string, token: string): Observable<WatchlistItem> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<WatchlistItem>(`${this.baseUrl}/${id}/watched`,
      {
        watched,
        user_rating: rating,
        comments: comment
      },
      { headers }
    );
  }


}
