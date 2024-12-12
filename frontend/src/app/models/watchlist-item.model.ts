// Interface used when adding a new item to the watchlist (doesn't require the `id`)
export interface WatchlistItemCreate {
  tmdb_id: number;
  type: 'movie' | 'tv';
  user_id: number;
}

// Interface used when fetching the item from the watchlist (requires the `id`)
export type WatchlistItem = Movie | TvShow;

export interface Movie {
  id: number; // Unique ID for the movie
  tmdb_id: number; // TMDB ID for the movie
  watched: boolean;
  added_date: string;
  title: string;
  posterPath: string;
  overview: string;
  genres: string;
  releaseDate: string;
  runtime: number;
  type: 'movie'; // Specify that it's a movie
}

export interface Season {
  seasonNumber: number;
  episodeCount: number;
  posterUrl: string;
}

export interface TvShow {
  id: number; // Unique ID for the TV show
  tmdb_id: number; // TMDB ID for the TV show
  watched: boolean;
  added_date: string;
  title: string;
  posterPath: string;
  overview: string;
  genres: string;
  firstAirDate: string;
  lastAirDate: string;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  voteAverage: number;
  status: string;
  seasons: Season[]; // Array of seasons
  type: 'tv'; // Specify that it's a TV show
}
