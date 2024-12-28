"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWatchedStatus = exports.deleteWatchlistItem = exports.getWatchlist = exports.addToWatchlist = void 0;
const db_1 = require("../utils/db");
// Function to add an item to the watchlist
const addToWatchlist = (user_id, type, tmdb_id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
        INSERT INTO watchlist (type, tmdb_id, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const params = [type, tmdb_id, user_id];
    const result = yield (0, db_1.query)(sql, params);
    return result[0];
});
exports.addToWatchlist = addToWatchlist;
// Function to get all watchlist items ordered by added_date descending
const getWatchlist = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM watchlist WHERE user_id = $1 ORDER BY added_date DESC;';
    const params = [user_id];
    const result = yield (0, db_1.query)(sql, params);
    return result;
});
exports.getWatchlist = getWatchlist;
// Function to delete a watchlist item
const deleteWatchlistItem = (user_id, id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `DELETE FROM watchlist WHERE id = $1 AND user_id = $2 RETURNING *;`;
    const params = [id, user_id];
    const result = yield (0, db_1.query)(sql, params);
    return result[0];
});
exports.deleteWatchlistItem = deleteWatchlistItem;
// Function to update the watched status of a watchlist item
const updateWatchedStatus = (user_id_1, id_1, watched_1, ...args_1) => __awaiter(void 0, [user_id_1, id_1, watched_1, ...args_1], void 0, function* (user_id, id, watched, user_rating = null, comments = null) {
    let sql;
    let params;
    if (watched) {
        // If `watched` is true, update all relevant fields
        sql = `
            UPDATE watchlist 
            SET watched = $1, user_rating = $2, comments = $3 
            WHERE id = $4 AND user_id = $5 
            RETURNING *;
        `;
        params = [watched, user_rating, comments, id, user_id];
    }
    else {
        // If `watched` is false, clear the `user_rating` and `comments` fields
        sql = `
            UPDATE watchlist 
            SET watched = $1, user_rating = NULL, comments = NULL 
            WHERE id = $2 AND user_id = $3 
            RETURNING *;
        `;
        params = [watched, id, user_id];
    }
    const result = yield (0, db_1.query)(sql, params);
    if (result.length === 0) {
        throw new Error('Watchlist item not found or user not authorized');
    }
    return result[0];
});
exports.updateWatchedStatus = updateWatchedStatus;
