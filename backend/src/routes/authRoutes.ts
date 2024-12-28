// routes/authRoutes.ts
import express, { Request, Response } from 'express';
import { signUp, login } from '../models/user';
import { body, validationResult } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and management
 */

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
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
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
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: johndoe@example.com
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
 *                         example: Username is required
 *                       param:
 *                         type: string
 *                         example: username
 *                       location:
 *                         type: string
 *                         example: body
 *       500:
 *         description: Error signing up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error signing up
 *                 error:
 *                   type: string
 *                   example: Detailed error message
 */
router.post(
    '/signup',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    //@ts-ignore
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password } = req.body;
        try {
            const newUser = await signUp(username, email, password);
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error: any) {
            console.error('Error during signup:', error);
            res.status(500).json({ message: 'Error signing up', error: error.message });
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
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
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
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: johndoe@example.com
 *                 username:
 *                   type: string
 *                   example: johndoe
 *       400:
 *         description: Invalid credentials or validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *                 error:
 *                   type: string
 *                   example: Detailed error message
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: Password is required
 *                       param:
 *                         type: string
 *                         example: password
 *                       location:
 *                         type: string
 *                         example: body
 */
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    //@ts-ignore
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const { user_id, token, username } = await login(email, password);
            res.status(200).json({
                message: 'Login successful',
                token,
                userId: user_id, // Changed from user_id to userId for consistency
                email,
                username,
            });
        } catch (error: any) {
            console.error('Error during login:', error);
            res.status(400).json({ message: 'Invalid credentials', error: error.message });
        }
    }
);

export default router;
