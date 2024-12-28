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
exports.login = exports.signUp = void 0;
// models/userModel.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../utils/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}
const signUp = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const sql = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email;
    `;
    const params = [username, email, hashedPassword];
    const result = yield (0, db_1.query)(sql, params);
    return result[0]; // Return the created user
});
exports.signUp = signUp;
// Function to login a user (generate JWT token)
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM users WHERE email = $1;';
    const params = [email];
    const result = yield (0, db_1.query)(sql, params);
    if (result.length === 0) {
        throw new Error('User not found');
    }
    const user = result[0];
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    // Generate JWT token
    // @ts-ignore
    const token = jsonwebtoken_1.default.sign({ user_id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return {
        user_id: user.id,
        token,
        email: user.email,
        username: user.username,
    };
});
exports.login = login;
