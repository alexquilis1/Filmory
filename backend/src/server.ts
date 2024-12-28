import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import movieRoutes from "./routes/movieRoutes";
import { setupSwagger } from './utils/swagger';
import { authenticate } from './middleware/authMiddleware'
import authRoutes from "./routes/authRoutes";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON requests

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Movie Watchlist API');
});

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api', movieRoutes);
// @ts-ignore
app.use('/api/watchlist', authenticate, (req: Request, res: Response) => {
    res.send('This is a protected watchlist route');
});

setupSwagger(app);



// Export the app and start function
export const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

export default app;
