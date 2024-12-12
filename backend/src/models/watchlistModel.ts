import { WatchlistItem } from '../types/watchlistTypes';
import { query } from '../utils/db';

// Función para agregar un elemento a la watchlist
export const addToWatchlist = async (user_id: number, type: 'movie' | 'tv', tmdb_id: number): Promise<WatchlistItem> => {
    const sql = `
        INSERT INTO watchlist (type, tmdb_id, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const params = [type, tmdb_id, user_id]; // Corrected to use user_id instead of user_id_fk
    console.log("Params being passed to SQL:", params); // Log params here

    const result = await query(sql, params);
    return result[0];  // Devuelve el primer registro insertado
};

// Función para obtener todos los elementos de la watchlist
export const getWatchlist = async (user_id: number): Promise<WatchlistItem[]> => {
    const sql = 'SELECT * FROM watchlist WHERE user_id = $1;';
    const params = [user_id]
    const result = await query(sql, params);
    return result;  // Devuelve todos los elementos de la tabla
};

//
export const deleteWatchlistItem = async (user_id: number, id: number): Promise<WatchlistItem> => {
    const sql = `DELETE FROM watchlist WHERE id = $1 AND user_id = $2 RETURNING *;`;
    const params = [id, user_id];
    const result = await query(sql, params);
    return result[0]; // Returns the deleted item, if any
}

//
export const updateWatchedStatus = async (user_id: number, id: number, watched: boolean): Promise<WatchlistItem> => {
    const sql = `UPDATE watchlist SET watched = $1 WHERE id = $2 AND user_id = $3 RETURNING *;`;
    const params = [watched, id, user_id];
    const result = await query(sql, params);
    return result[0]; // Returns the updated item, if any
};