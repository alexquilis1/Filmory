// Interface used when adding a new item to the watchlist (doesn't require the `id`)
export interface WatchlistItemCreate {
  tmdb_id: number;
  type: 'movie' | 'tv';
  user_id: number;
}

// Interface used when fetching the item from the watchlist (requires the `id`)
export type WatchlistItem = Movie | TvShow;

export interface Movie {
  id: number;
  tmdb_id: number;
  watched: boolean;
  added_date: string;
  title: string;
  posterPath: string;
  overview: string;
  genres: string;
  releaseDate: string;
  runtime: number;
  voteAverage: number;
  type: 'movie';
  user_rating: number | null;
  comments: string | null;
}

export interface Season {
  seasonNumber: number;
  episodeCount: number;
  averageVote: number;
}

export interface TvShow {
  id: number;
  tmdb_id: number;
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
  seasons: Season[];
  type: 'tv';
  user_rating: number | null;
  comments: string | null;
}
