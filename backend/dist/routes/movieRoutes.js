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
 * /trending:
 *   get:
 *     summary: Get trending movies and series
 *     tags: [Movies, TV Series]
 *     responses:
 *       200:
 *         description: List of trending movies and series
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movies:
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
 *                 series:
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
 *         description: Error fetching trending data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/trending', movieController.getTrendingMoviesAndSeries);
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
 *           example: Inception
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
 *                         example: 27205
 *                       title:
 *                         type: string
 *                         example: Inception
 *                       overview:
 *                         type: string
 *                         example: A thief who steals corporate secrets...
 *                       poster_path:
 *                         type: string
 *                         nullable: true
 *                         example: /qmDpIHrmpJINaRKAfWQfftjCdyi.jpg
 *                       release_date:
 *                         type: string
 *                         format: date
 *                         example: 2010-07-16
 *       400:
 *         description: Bad request - Invalid title parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid movie title provided
 *       500:
 *         description: Error fetching movies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching movies
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
 *           example: 550
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
 *                   example: 550
 *                 title:
 *                   type: string
 *                   example: Fight Club
 *                 overview:
 *                   type: string
 *                   example: A ticking-time-bomb insomniac and a slippery soap salesman...
 *                 poster_path:
 *                   type: string
 *                   nullable: true
 *                   example: /bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg
 *                 release_date:
 *                   type: string
 *                   format: date
 *                   example: 1999-10-15
 *       400:
 *         description: Bad request - Invalid movie ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid movie ID provided
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Movie not found
 *       500:
 *         description: Error fetching movie details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching movie details
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
 *           example: Breaking Bad
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
 *                         example: 1396
 *                       name:
 *                         type: string
 *                         example: Breaking Bad
 *                       overview:
 *                         type: string
 *                         example: When Walter White, a New Mexico chemistry teacher...
 *                       poster_path:
 *                         type: string
 *                         nullable: true
 *                         example: /ggFHVNu6YYI5L9pCfOacjizRGt.jpg
 *                       first_air_date:
 *                         type: string
 *                         format: date
 *                         example: 2008-01-20
 *       400:
 *         description: Bad request - Invalid series title
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid TV series title provided
 *       500:
 *         description: Error fetching TV series
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching TV series
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
 *           example: 1396
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
 *                   example: 1396
 *                 name:
 *                   type: string
 *                   example: Breaking Bad
 *                 overview:
 *                   type: string
 *                   example: When Walter White, a New Mexico chemistry teacher...
 *                 poster_path:
 *                   type: string
 *                   nullable: true
 *                   example: /ggFHVNu6YYI5L9pCfOacjizRGt.jpg
 *                 first_air_date:
 *                   type: string
 *                   format: date
 *                   example: 2008-01-20
 *       400:
 *         description: Bad request - Invalid series ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid TV series ID provided
 *       404:
 *         description: TV series not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: TV series not found
 *       500:
 *         description: Error fetching TV series details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching TV series details
 */
router.get('/series/:id', movieController.getTVSeriesDetails);
/**
 * @swagger
 * /watchlist:
 *   get:
 *     summary: Get all items in the watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
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
 *                     example: 1
 *                   type:
 *                     type: string
 *                     example: movie
 *                   tmdb_id:
 *                     type: integer
 *                     example: 550
 *                   title:
 *                     type: string
 *                     example: Fight Club
 *                   watched:
 *                     type: boolean
 *                     example: false
 *                   user_rating:
 *                     type: integer
 *                     nullable: true
 *                     example: 8
 *                   comments:
 *                     type: string
 *                     nullable: true
 *                     example: "Great movie!"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authorization token is missing or invalid
 *       500:
 *         description: Error fetching watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 */
// @ts-ignore
router.get('/watchlist', authMiddleware_1.authenticate, watchlistController.getWatchlistController);
/**
* @swagger
* /watchlist/add:
*   post:
*     summary: Add an item to the watchlist
*     tags: [Watchlist]
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: Details of the item to add to the watchlist
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               tmdb_id:
*                 type: integer
*                 description: The TMDB ID of the item
*                 example: 550
*               type:
*                 type: string
*                 enum: [movie, tv]
*                 description: The type of the item (movie or tv)
*                 example: movie
*             required:
*               - tmdb_id
*               - type
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
*                   example: 1
*                 tmdb_id:
*                   type: integer
*                   example: 550
*                 type:
*                   type: string
*                   example: movie
*                 user_id:
*                   type: integer
*                   example: 1
*                 watched:
*                   type: boolean
*                   description: Whether the item has been watched
*                   example: false
*       400:
*         description: Validation errors
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 errors:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       msg:
*                         type: string
*                         example: tmdb_id is required
*                       param:
*                         type: string
*                         example: tmdb_id
*                       location:
*                         type: string
*                         example: body
*       401:
*         description: Unauthorized - Missing or invalid token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Authorization token is missing or invalid
*       500:
*         description: Error adding item to the watchlist
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Error adding item to the watchlist
*/
// @ts-ignore
router.post('/watchlist/add', authMiddleware_1.authenticate, watchlistController.addToWatchlistController);
/**
 * @swagger
 * /watchlist/{id}/delete:
 *   delete:
 *     summary: Delete an item from the watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the item to delete from the watchlist
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Item successfully deleted from the watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 tmdb_id:
 *                   type: integer
 *                   example: 550
 *                 type:
 *                   type: string
 *                   example: movie
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 watched:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Bad request - Invalid watchlist item ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid watchlist item ID provided
 *       404:
 *         description: Watchlist item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Watchlist item not found
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authorization token is missing or invalid
 *       500:
 *         description: Error deleting item from the watchlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting item from the watchlist
 */
// @ts-ignore
router.delete('/watchlist/:id/delete', authMiddleware_1.authenticate, watchlistController.deleteWatchlistController);
/**
 * @swagger
 * /watchlist/{id}/watched:
 *   patch:
 *     summary: Update the watched status of a watchlist item
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the item in the watchlist to update
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
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
 *                 example: true
 *               user_rating:
 *                 type: integer
 *                 description: User rating for the item
 *                 example: 8
 *               comments:
 *                 type: string
 *                 description: User comments for the item
 *                 example: "Great movie!"
 *             required:
 *               - watched
 *     responses:
 *       200:
 *         description: Watched status successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 tmdb_id:
 *                   type: integer
 *                   example: 550
 *                 type:
 *                   type: string
 *                   example: movie
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 watched:
 *                   type: boolean
 *                   example: true
 *                 user_rating:
 *                   type: integer
 *                   example: 8
 *                 comments:
 *                   type: string
 *                   example: "Great movie!"
 *       400:
 *         description: Validation errors or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: user_rating is required when watched is true
 *                       param:
 *                         type: string
 *                         example: user_rating
 *                       location:
 *                         type: string
 *                         example: body
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authorization token is missing or invalid
 *       404:
 *         description: Watchlist item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Watchlist item not found
 *       500:
 *         description: Error updating watched status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating watched status
 */
// @ts-ignore
router.patch('/watchlist/:id/watched', authMiddleware_1.authenticate, watchlistController.updateWatchlistController);
exports.default = router;
