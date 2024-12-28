import { WatchlistItem } from '../types/watchlistTypes';
import { query } from '../utils/db';

// Function to add an item to the watchlist
export const addToWatchlist = async (
    user_id: number,
    type: 'movie' | 'tv',
    tmdb_id: number
): Promise<WatchlistItem> => {
    const sql = `
        INSERT INTO watchlist (type, tmdb_id, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const params = [type, tmdb_id, user_id];
    const result = await query(sql, params);
    return result[0];
};

// Function to get all watchlist items ordered by added_date descending
export const getWatchlist = async (user_id: number): Promise<WatchlistItem[]> => {
    const sql = 'SELECT * FROM watchlist WHERE user_id = $1 ORDER BY added_date DESC;';
    const params = [user_id];
    const result = await query(sql, params);
    return result;
};

// Function to delete a watchlist item
export const deleteWatchlistItem = async (user_id: number, id: number): Promise<WatchlistItem> => {
    const sql = `DELETE FROM watchlist WHERE id = $1 AND user_id = $2 RETURNING *;`;
    const params = [id, user_id];
    const result = await query(sql, params);
    return result[0];
};

// Function to update the watched status of a watchlist item
export const updateWatchedStatus = async (
    user_id: number,
    id: number,
    watched: boolean,
    user_rating: number | null = null,
    comments: string | null = null
): Promise<WatchlistItem> => {
    let sql: string;
    let params: (number | string | boolean | null)[];

    if (watched) {
        // If `watched` is true, update all relevant fields
        sql = `
            UPDATE watchlist 
            SET watched = $1, user_rating = $2, comments = $3 
            WHERE id = $4 AND user_id = $5 
            RETURNING *;
        `;
        params = [watched, user_rating, comments, id, user_id];
    } else {
        // If `watched` is false, clear the `user_rating` and `comments` fields
        sql = `
            UPDATE watchlist 
            SET watched = $1, user_rating = NULL, comments = NULL 
            WHERE id = $2 AND user_id = $3 
            RETURNING *;
        `;
        params = [watched, id, user_id];
    }

    const result = await query(sql, params);

    if (result.length === 0) {
        throw new Error('Watchlist item not found or user not authorized');
    }

    return result[0];
};
