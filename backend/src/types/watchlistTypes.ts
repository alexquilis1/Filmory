export interface WatchlistItem {
    id: number;
    type: 'movie' | 'tv';
    tmdb_id: number;
    added_date: string;
    watched: boolean;
    user_id: number;
}
