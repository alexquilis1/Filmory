// src/controllers/movieController.ts
import { Request, Response } from 'express';
import '../types/types'; // Esto carga los tipos globalmente
import * as tmdb from '../utils/tmdb';

// Función para manejar la solicitud de las películas y series populares
export const getTrendingMoviesAndSeries = async (req: Request, res: Response) => {
    try {
        const trendingData = await tmdb.getTrendingMoviesAndSeries();

        // Devuelve los datos al cliente (frontend)
        res.json(trendingData);
    } catch (error) {
        console.error('Error fetching trending data:', error);
        res.status(500).json({ message: 'Error fetching trending data' });
    }
};

// Controller for searching movies
export const searchMovie = async (req: Request, res: Response) => {
    const {title} = req.params;
    try {
        const movies = await tmdb.searchMovies(title);
        res.status(200).json(movies);
    } catch (error: any) {
        console.error('Error in searchMovie controller:', error.message)
        res.status(500).json({message: 'Error fetching movie data'});
    }
};

// Controller for fetching movie details by ID
export const getMovieDetails = async (req: Request, res: Response) => {
    const movieId = req.params.id;

    try {
        const movieDetails = await tmdb.getMovieDetails(movieId);
        res.json(movieDetails);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: 'Error fetching movie details:', error: error.message });
    }
};

// Controller for searching TV series
export const searchTVSeries = async (req: Request, res: Response) => {
    const { title } = req.params;

    try {
        const series = await tmdb.searchTVSeries(title);
        res.status(200).json(series);
    } catch (error: any) {
        console.error('Error in searchTVSeries controller:', error.message)
        res.status(500).json({ message: 'Error fetching TV series data'});
    }
}

// Controller for fetching TV series details by ID
export const getTVSeriesDetails = async (req: Request, res: Response) => {
    const seriesId = req.params.id;

    try {
        const seriesDetails = await tmdb.getTVSeriesDetails(seriesId);
        res.json(seriesDetails);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: 'Error fetching TV series details:', error: error.message });
    }
}

