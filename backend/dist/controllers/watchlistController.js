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
exports.updateWatchlistController = exports.deleteWatchlistController = exports.getWatchlistController = exports.addToWatchlistController = void 0;
require("../types/types"); // Esto carga los tipos globalmente
const watchlistModel_1 = require("../models/watchlistModel");
// Controller to add elements to the Watchlist
const addToWatchlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, tmdb_id, title } = req.body;
    const userId = req.user.id; // Assume you have the userId from middleware
    try {
        const newItem = yield (0, watchlistModel_1.addToWatchlist)(userId, type, tmdb_id, title);
        res.status(201).json(newItem); // Return the added item
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding to watchlist', error });
    }
});
exports.addToWatchlistController = addToWatchlistController;
// Controller to get Watchlist
const getWatchlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id; // Assume userId is available in req.user
    try {
        const watchlistItems = yield (0, watchlistModel_1.getWatchlist)(userId);
        res.status(200).json(watchlistItems); // Return all watchlist items
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching watchlist items', error });
    }
});
exports.getWatchlistController = getWatchlistController;
const deleteWatchlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const deletedItem = yield (0, watchlistModel_1.deleteWatchlistItem)(userId, Number(id));
        res.status(200).json(deletedItem); // Return the deleted item
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting watchlist item', error });
    }
});
exports.deleteWatchlistController = deleteWatchlistController;
const updateWatchlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { watched } = req.body;
    const userId = req.user.id;
    try {
        const updatedItem = yield (0, watchlistModel_1.updateWatchedStatus)(userId, Number(id), watched);
        res.status(200).json(updatedItem); // Return the updated item
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating watchlist item', error });
    }
});
exports.updateWatchlistController = updateWatchlistController;
