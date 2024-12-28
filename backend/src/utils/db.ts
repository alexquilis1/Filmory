// @ts-ignore
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movie_series_watchlist',
    password: 'root',
    port: 5432,
});

export const query = async (sql: string, params: any[]) => {
    try {
        const res = await pool.query(sql, params);
        return res.rows;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};
