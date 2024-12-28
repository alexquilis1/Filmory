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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTVSeriesDetails = exports.searchTVSeries = exports.getMovieDetails = exports.searchMovies = exports.getTrendingMoviesAndSeries = void 0;
// src/tmdb.ts
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const apiKey = process.env.TMDB_API_KEY;
if (!apiKey) {
    console.error('Error (tmdb.ts): TMDB API Key is missing!');
    process.exit(1);
}
const getTrendingMoviesAndSeries = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://api.themoviedb.org/3/trending/all/day', {
            params: {
                api_key: apiKey,
                language: 'en-EN'
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching trending movies and series:', error);
        throw new Error('Failed to fetch trending movies and series');
    }
});
exports.getTrendingMoviesAndSeries = getTrendingMoviesAndSeries;
// Function to search movies by query
const searchMovies = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: apiKey,
                query: title,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
    }
});
exports.searchMovies = searchMovies;
// Function to get movie details by movie ID
const getMovieDetails = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: apiKey,
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error('Error fetching movie details');
    }
});
exports.getMovieDetails = getMovieDetails;
// Search TV series by name
const searchTVSeries = (title) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.get('https://api.themoviedb.org/3/search/tv', {
            params: {
                api_key: apiKey,
                query: title,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching TV series data:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error('Failed to fetch movies');
    }
});
exports.searchTVSeries = searchTVSeries;
// Get TV series details by ID
const getTVSeriesDetails = (seriesId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/tv/${seriesId}`, {
            params: {
                api_key: apiKey,
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error('Error fetching TV series details');
    }
});
exports.getTVSeriesDetails = getTVSeriesDetails;
