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
const JWT_SECRET = process.env.JWT_SECRET; // Store this in an environment variable, e.g., process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables (authMiddleware.ts)');
}
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', ''); // Expecting 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // @ts-ignore
        req.user = decoded; // Add decoded user info to the request
        next(); // Continue to the next middleware/route handler
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            // Handle invalid or expired token
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.authenticate = authenticate;
