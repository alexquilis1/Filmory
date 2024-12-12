import express from 'express';
import { authenticate} from "../middleware/authMiddleware";
import * as movieController from '../controllers/movieController';
import * as watchlistController from '../controllers/watchlistController';

const router = express.Router();

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
router.get('/watchlist', authenticate, watchlistController.getWatchlistController);

/**
 * @swagger
 * /watchlist/add:
 *   post:
 *     summary: Add an item to the watchlist
 *     tags: [Watchlist]
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
 *               type:
 *                 type: string
 *                 enum: [movie, tv]
 *                 description: The type of the item (movie or tv)
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user adding the item
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
 *                 tmdb_id:
 *                   type: integer
 *                 type:
 *                   type: string
 *                 user_id:
 *                   type: integer
 *                 watched:
 *                   type: boolean
 *                   description: Whether the item has been watched
 */
// @ts-ignore
router.post('/watchlist/add', authenticate, watchlistController.addToWatchlistController);

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
router.delete('/watchlist/:id/delete', authenticate, watchlistController.deleteWatchlistController);

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
router.patch('/watchlist/:id/watched', authenticate, watchlistController.updateWatchlistController);

export default router;
