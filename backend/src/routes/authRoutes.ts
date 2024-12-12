// routes/authRoutes.ts
import express, { Request, Response } from 'express';
import { signUp, login } from '../models/user';  // Import signup and login functions
import { body, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Authentication]
 *     requestBody:
 *       description: The user signup details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       500:
 *         description: Error signing up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post(
    '/signup',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    // @ts-ignore
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        try {
            const newUser = await signUp(username, email, password);
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error signing up', error });
        }
    }
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       description: The user login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: integer
 *                 email:
 *                   type: string  // Add email to the response
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    // @ts-ignore
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            // @ts-ignore
            const { user_id, token } = await login(email, password);  // Ensure login returns userId, token, and userEmail
            res.status(200).json({
                message: 'Login successful',
                token,
                user_id,  // Return userId alongside token
                email: email,  // Return email alongside other data
            });
        } catch (error) {
            res.status(400).json({ message: 'Invalid credentials', error });
        }
    }
);

export default router;
