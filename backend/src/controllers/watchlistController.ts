import { Request, Response } from 'express';
import '../types/types'; // This loads the global types
import { WatchlistItem } from '../types/watchlistTypes';
import { addToWatchlist, getWatchlist, deleteWatchlistItem, updateWatchedStatus } from '../models/watchlistModel';

// Controller to add elements to the Watchlist
export const addToWatchlistController = async (req: Request, res: Response): Promise<Response> => {
    const { type, tmdb_id } = req.body;

    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user.user_id;

    try {
        const newItem: WatchlistItem = await addToWatchlist(userId, type, tmdb_id);
        return res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding to watchlist', error });
    }
};

// Controller to get Watchlist
export const getWatchlistController = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user.user_id;

    try {
        const watchlistItems: WatchlistItem[] = await getWatchlist(userId);
        return res.status(200).json(watchlistItems);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching watchlist items', error });
    }
};

// Controller to delete Watchlist item
export const deleteWatchlistController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user.user_id;

    try {
        const deletedItem: WatchlistItem = await deleteWatchlistItem(userId, Number(id));
        return res.status(200).json(deletedItem);
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting watchlist item', error });
    }
};

// Controller to update Watchlist item status
export const updateWatchlistController = async (req: Request, res: Response): Promise<Response> => {
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
        const updatedItem: WatchlistItem = await updateWatchedStatus(
            userId,
            Number(id),
            watched,
            watched ? user_rating : null,
            watched ? comments : null
        );

        return res.status(200).json(updatedItem);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating watchlist item', error });
    }
};
