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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const movieController = __importStar(require("../controllers/movieController"));
const watchlistController = __importStar(require("../controllers/watchlistController"));
const router = express_1.default.Router();
/**
 * @swagger
 * /search-movie/{title}:
 *   get:
 *     summary: Search for movies by title
 *     tags: [Movies]
 *     parameters:
 *       - name: title
 *         in: path
 *         description: Movie title to search for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of movies matching the search title
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       overview:
 *                         type: string
 *                       poster_path:
 *                         type: string
 *                         nullable: true
 *                       release_date:
 *                         type: string
 *                         format: date
 *       500:
 *         description: Error fetching movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
// @ts-ignore
router.get('/search-movie/:title', movieController.searchMovie);
/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Get movie details by ID
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the movie in TMDB
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 overview:
 *                   type: string
 */
router.get('/movie/:id', movieController.getMovieDetails);
/**
 * @swagger
 * /search-series/{title}:
 *   get:
 *     summary: Search for TV series by title
 *     tags: [TV Series]
 *     parameters:
 *       - name: title
 *         in: path
 *         description: TV series title to search for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of TV series matching the search title
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       overview:
 *                         type: string
 *                       poster_path:
 *                         type: string
 *                         nullable: true
 *                       first_air_date:
 *                         type: string
 *                         format: date
 *       500:
 *         description: Error fetching TV series
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
// @ts-ignore
router.get('/search-series/:title', movieController.searchTVSeries);
/**
 * @swagger
 * /series/{id}:
 *   get:
 *     summary: Get TV series details by ID
 *     tags: [TV Series]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the TV series in TMDB
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: TV series details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 overview:
 *                   type: string
 */
router.get('/series/:id', movieController.getTVSeriesDetails);
/**
 * @swagger
 * /watchlist:
 *   get:
 *     summary: Get all items in the watchlist
 *     tags: [Watchlist]
 *     responses:
 *       200:
 *         description: List of items in the watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   type:
 *                     type: string
 *                   tmdb_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   watched:
 *                     type: boolean
 */
// @ts-ignore
router.get('/watchlist', authMiddleware_1.authenticate, watchlistController.getWatchlistController);
/**
 * @swagger
 * /watchlist/add:
 *   post:
 *     summary: Add an item to the watchlist
 *     tags: [Watchlist]
 *     requestBody:
 *       description: Watchlist item details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [movie, tv]
 *               tmdb_id:
 *                 type: integer
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item successfully added to the watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 type:
 *                   type: string
 *                 tmdb_id:
 *                   type: integer
 *                 title:
 *                   type: string
 */
// @ts-ignore
router.post('/watchlist/add', authMiddleware_1.authenticate, watchlistController.addToWatchlistController);
/**
 * @swagger
 * /watchlist/{id}/delete:
 *   delete:
 *     summary: Delete an item from the watchlist
 *     tags: [Watchlist]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the item to delete from the watchlist
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item successfully deleted from the watchlist
 *       500:
 *         description: Error deleting item from the watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
// @ts-ignore
router.delete('/watchlist/:id/delete', authMiddleware_1.authenticate, watchlistController.deleteWatchlistController);
/**
 * @swagger
 * /watchlist/{id}/watched:
 *   patch:
 *     summary: Update the watched status of a watchlist item
 *     tags: [Watchlist]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the item in the watchlist to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Watched status update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               watched:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Watched status successfully updated
 *       500:
 *         description: Error updating watched status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
// @ts-ignore
router.patch('/watchlist/:id/watched', authMiddleware_1.authenticate, watchlistController.updateWatchlistController);
exports.default = router;
