"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
// middleware/authMiddleware.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in the environment variables');
    throw new Error('JWT_SECRET is not defined in the environment variables (authMiddleware.ts)');
}
const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded payload to req.user
        next();
    }
    catch (error) {
        console.error('JWT verification error:', error);
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.authenticate = authenticate;
