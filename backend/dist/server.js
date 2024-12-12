"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const swagger_1 = require("./utils/swagger");
const authMiddleware_1 = require("./middleware/authMiddleware");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '.env') });
// Initialize Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)()); // Enable CORS for cross-origin requests
app.use(express_1.default.json()); // Parse JSON requests
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Watchlist API');
});
app.use('/api/auth', authRoutes_1.default); // Authentication routes
app.use('/api', movieRoutes_1.default);
// @ts-ignore
app.use('/api/watchlist', authMiddleware_1.authenticate, (req, res) => {
    res.send('This is a protected watchlist route');
});
(0, swagger_1.setupSwagger)(app); // Configure Swagger UI
// Export the app and start function
const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};
exports.startServer = startServer;
exports.default = app;
