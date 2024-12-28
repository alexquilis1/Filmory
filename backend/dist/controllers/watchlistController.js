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
require("../types/types"); // This loads the global types
const watchlistModel_1 = require("../models/watchlistModel");
// Controller to add elements to the Watchlist
const addToWatchlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, tmdb_id } = req.body;
    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const userId = req.user.user_id;
    try {
        const newItem = yield (0, watchlistModel_1.addToWatchlist)(userId, type, tmdb_id);
        return res.status(201).json(newItem);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding to watchlist', error });
    }
});
exports.addToWatchlistController = addToWatchlistController;
// Controller to get Watchlist
const getWatchlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const userId = req.user.user_id;
    try {
        const watchlistItems = yield (0, watchlistModel_1.getWatchlist)(userId);
        return res.status(200).json(watchlistItems);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching watchlist items', error });
    }
});
exports.getWatchlistController = getWatchlistController;
// Controller to delete Watchlist item
const deleteWatchlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const userId = req.user.user_id;
    try {
        const deletedItem = yield (0, watchlistModel_1.deleteWatchlistItem)(userId, Number(id));
        return res.status(200).json(deletedItem);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting watchlist item', error });
    }
});
exports.deleteWatchlistController = deleteWatchlistController;
// Controller to update Watchlist item status
const updateWatchlistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { watched, user_rating, comments } = req.body;
    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const userId = req.user.user_id;
    try {
        // Validate that if watched is true, user_rating and comments are required
        if (watched) {
            if (user_rating === undefined || user_rating === null || comments === undefined || comments === null) {
                return res.status(400).json({
                    message: 'user_rating and comments are required when watched is true'
                });
            }
            // Validate that user_rating is within the allowed range
            if (user_rating < 0 || user_rating > 10) {
                return res.status(400).json({
                    message: 'user_rating must be between 0 and 10'
                });
            }
        }
        const updatedItem = yield (0, watchlistModel_1.updateWatchedStatus)(userId, Number(id), watched, watched ? user_rating : null, watched ? comments : null);
        return res.status(200).json(updatedItem);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating watchlist item', error });
    }
});
exports.updateWatchlistController = updateWatchlistController;
