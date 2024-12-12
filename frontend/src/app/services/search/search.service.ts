import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Buscar película por ID
  searchMovieById(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return {
          title: response.title, // Título de la película
          posterPath: `https://image.tmdb.org/t/p/w500${response.poster_path}`, // Póster de la película
          overview: response.overview, // Descripción
          genres: response.genres.map((genre: any) => genre.name).join(', '), // Géneros (en formato de texto)
          releaseDate: response.release_date, // Fecha de estreno
          runtime: response.runtime, // Duración en minutos
        };
      })
    );
  }

  // Metodo para obtener los detalles de una serie por su ID
  searchTvShowById(tvShowId: number): Observable<any> {
    const url = `${this.baseUrl}/series/${tvShowId}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return {
          title: response.name,  // Título de la serie
          posterPath: `https://image.tmdb.org/t/p/w500${response.poster_path}`, // Póster de la serie
          overview: response.overview,  // Descripción de la serie
          genres: response.genres.map((genre: any) => genre.name).join(', '),  // Géneros (en formato de texto)
          firstAirDate: response.first_air_date,  // Fecha de estreno
          lastAirDate: response.last_air_date,  // Fecha de finalización (si está disponible)
          numberOfSeasons: response.number_of_seasons,  // Número de temporadas
          numberOfEpisodes: response.number_of_episodes,  // Número de episodios
          voteAverage: response.vote_average,  // Promedio de votación
          status: response.status,  // Estado de la serie
          seasons: response.seasons.map((season: any) => ({
            seasonNumber: season.season_number,  // Número de temporada
            episodeCount: season.episode_count,  // Número de episodios en la temporada
            averageVote: season.vote_average,  // Promedio de votación de la temporada
            posterUrl: `https://image.tmdb.org/t/p/w500${season.poster_path}`  // Póster de la temporada
          }))
        };
      })
    );
  }

}
