import { Request, Response } from 'express';
import '../types/types'; // Esto carga los tipos globalmente
import { WatchlistItem } from '../types/watchlistTypes';
import { addToWatchlist, getWatchlist, deleteWatchlistItem, updateWatchedStatus } from '../models/watchlistModel';

// Controller to add elements to the Watchlist
export const addToWatchlistController = async (req: Request, res: Response): Promise<Response> => {
    const { type, tmdb_id } = req.body;

    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user.user_id;  // Asegúrate de usar 'user_id' aquí

    try {
        const newItem: WatchlistItem = await addToWatchlist(userId, type, tmdb_id);
        return res.status(201).json(newItem); // Return the added item
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

    const userId = req.user.user_id;  // Asegúrate de usar 'user_id' aquí

    try {
        const watchlistItems: WatchlistItem[] = await getWatchlist(userId);
        return res.status(200).json(watchlistItems); // Return all watchlist items
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

    const userId = req.user.user_id;  // Asegúrate de usar 'user_id' aquí

    try {
        const deletedItem: WatchlistItem = await deleteWatchlistItem(userId, Number(id));
        return res.status(200).json(deletedItem); // Return the deleted item
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting watchlist item', error });
    }
};

// Controller to update Watchlist item status
export const updateWatchlistController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { watched } = req.body;

    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user.user_id;  // Asegúrate de usar 'user_id' aquí

    try {
        const updatedItem: WatchlistItem = await updateWatchedStatus(userId, Number(id), watched);
        return res.status(200).json(updatedItem); // Return the updated item
    } catch (error) {
        return res.status(500).json({ message: 'Error updating watchlist item', error });
    }
};
