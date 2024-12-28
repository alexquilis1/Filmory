// src/tmdb.ts
import axios from 'axios';
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
    console.error('Error (tmdb.ts): TMDB API Key is missing!');
    process.exit(1);
}

export const getTrendingMoviesAndSeries = async () => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/all/day', {
            params: {
                api_key: apiKey,
                language: 'en-EN'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trending movies and series:', error);
        throw new Error('Failed to fetch trending movies and series');
    }
};

// Function to search movies by query
export const searchMovies = async (title: string) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: apiKey,
                query: title,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
    }
};

// Function to get movie details by movie ID
export const getMovieDetails = async (movieId: string) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: apiKey,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching movie details');
    }
};

// Search TV series by name
export const searchTVSeries = async (title: string) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/tv', {
            params: {
                api_key: apiKey,
                query: title,
            },
        });
        return response.data
    } catch (error: any) {
        console.error('Error fetching TV series data:', error.response?.data || error.message);
        throw new Error('Failed to fetch movies');
    }
};

// Get TV series details by ID
export const getTVSeriesDetails = async (seriesId: string) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}`, {
            params: {
                api_key: apiKey,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching TV series details');
    }
}


