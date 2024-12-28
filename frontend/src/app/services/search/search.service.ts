import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  searchMovieById(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return {
          title: response.title,
          posterPath: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
          overview: response.overview,
          genres: response.genres.map((genre: any) => genre.name).join(', '),
          releaseDate: response.release_date,
          runtime: response.runtime,
          voteAverage: response.vote_average,
        };
      })
    );
  }

  searchTvShowById(tvShowId: number): Observable<any> {
    const url = `${this.baseUrl}/series/${tvShowId}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return {
          title: response.name,
          posterPath: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
          overview: response.overview,
          genres: response.genres.map((genre: any) => genre.name).join(', '),
          firstAirDate: response.first_air_date,
          lastAirDate: response.last_air_date,
          numberOfSeasons: response.number_of_seasons,
          numberOfEpisodes: response.number_of_episodes,
          voteAverage: response.vote_average,
          status: response.status,
          seasons: response.seasons.map((season: any) => ({
            seasonNumber: season.season_number,
            episodeCount: season.episode_count,
            averageVote: season.vote_average,
          }))
        };
      })
    );
  }

}
