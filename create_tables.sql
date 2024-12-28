-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create watchlist table
CREATE TABLE watchlist (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('movie', 'tv')),
    tmdb_id INTEGER NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    watched BOOLEAN DEFAULT FALSE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_rating INTEGER CHECK (user_rating >= 0 AND user_rating <= 10),
    comments TEXT,
    CONSTRAINT unique_tmdb_user UNIQUE (tmdb_id, user_id),
    CONSTRAINT check_watched_rating_comments CHECK (
        (watched = TRUE AND user_rating IS NOT NULL AND comments IS NOT NULL) OR
        (watched = FALSE AND user_rating IS NULL AND comments IS NULL)
    )
);
