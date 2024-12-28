"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getTVSeriesDetails = exports.searchTVSeries = exports.getMovieDetails = exports.searchMovie = exports.getTrendingMoviesAndSeries = void 0;
require("../types/types"); // This loads the global types
const tmdb = __importStar(require("../utils/tmdb"));
// Function to handle requests for trending movies and series
const getTrendingMoviesAndSeries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trendingData = yield tmdb.getTrendingMoviesAndSeries();
        // Returns the data to the client (frontend)
        res.json(trendingData);
    }
    catch (error) {
        console.error('Error fetching trending data:', error);
        res.status(500).json({ message: 'Error fetching trending data' });
    }
});
exports.getTrendingMoviesAndSeries = getTrendingMoviesAndSeries;
// Controller for searching movies
const searchMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.params;
    try {
        const movies = yield tmdb.searchMovies(title);
        res.status(200).json(movies);
    }
    catch (error) {
        console.error('Error in searchMovie controller:', error.message);
        res.status(500).json({ message: 'Error fetching movie data' });
    }
});
exports.searchMovie = searchMovie;
// Controller for fetching movie details by ID
const getMovieDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = req.params.id;
    try {
        const movieDetails = yield tmdb.getMovieDetails(movieId);
        res.json(movieDetails);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: 'Error fetching movie details:', error: error.message });
    }
});
exports.getMovieDetails = getMovieDetails;
// Controller for searching TV series
const searchTVSeries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.params;
    try {
        const series = yield tmdb.searchTVSeries(title);
        res.status(200).json(series);
    }
    catch (error) {
        console.error('Error in searchTVSeries controller:', error.message);
        res.status(500).json({ message: 'Error fetching TV series data' });
    }
});
exports.searchTVSeries = searchTVSeries;
// Controller for fetching TV series details by ID
const getTVSeriesDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const seriesId = req.params.id;
    try {
        const seriesDetails = yield tmdb.getTVSeriesDetails(seriesId);
        res.json(seriesDetails);
    }
    catch (error) {
        // @ts-ignore
        res.status(500).json({ message: 'Error fetching TV series details:', error: error.message });
    }
});
exports.getTVSeriesDetails = getTVSeriesDetails;
