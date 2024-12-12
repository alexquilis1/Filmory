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
// Función para agregar un elemento a la watchlist
const addToWatchlist = (userId, type, tmdb_id, title) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `
        INSERT INTO watchlist (type, tmdb_id, title, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const params = [type, tmdb_id, title, userId];
    const result = yield (0, db_1.query)(sql, params);
    return result[0]; // Devuelve el primer registro insertado
});
exports.addToWatchlist = addToWatchlist;
// Función para obtener todos los elementos de la watchlist
const getWatchlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM watchlist WHERE user_id = $1;';
    const params = [userId];
    const result = yield (0, db_1.query)(sql, params);
    return result; // Devuelve todos los elementos de la tabla
});
exports.getWatchlist = getWatchlist;
//
const deleteWatchlistItem = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `DELETE FROM watchlist WHERE id = $1 AND user_id = $2 RETURNING *;`;
    const params = [id, userId];
    const result = yield (0, db_1.query)(sql, params);
    return result[0]; // Returns the deleted item, if any
});
exports.deleteWatchlistItem = deleteWatchlistItem;
//
const updateWatchedStatus = (userId, id, watched) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `UPDATE watchlist SET watched = $1 WHERE id = $2 AND user_id = $3 RETURNING *;`;
    const params = [watched, id, userId];
    const result = yield (0, db_1.query)(sql, params);
    return result[0]; // Returns the updated item, if any
});
exports.updateWatchedStatus = updateWatchedStatus;
