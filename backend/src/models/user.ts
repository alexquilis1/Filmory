// models/userModel.ts
import bcrypt from 'bcryptjs';
import { query } from '../utils/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const JWT_SECRET = process.env.JWT_SECRET;  // Store this in an environment variable, e.g., process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

// Function to sign up a user
export const signUp = async (username: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email;
    `;
    const params = [username, email, hashedPassword];
    const result = await query(sql, params);
    return result[0];  // Return the created user
};

// Function to login a user (generate JWT token)
export const login = async (email: string, password: string) => {
    const sql = 'SELECT * FROM users WHERE email = $1;';
    const params = [email];
    const result = await query(sql, params);

    if (result.length === 0) {
        throw new Error('User not found');
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generate JWT token
    // @ts-ignore
    const token = jwt.sign({ user_id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Return userId, token, and email
    return {
        user_id: user.id,
        token,
        email: user.email,  // Include the email here
    };
};
