// middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import path from "path";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from 'express';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const JWT_SECRET = process.env.JWT_SECRET;  // Store this in an environment variable, e.g., process.env.JWT_SECRET

if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in the environment variables');
    throw new Error('JWT_SECRET is not defined in the environment variables (authMiddleware.ts)');
}

// Extend Request interface to include `user`
declare global {
    namespace Express {
        interface Request {
            user?: { user_id: number };
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { user_id: number };
        req.user = decoded; // Attach decoded payload to req.user
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error('JWT verification error:', error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
