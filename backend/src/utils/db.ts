// @ts-ignore
import { Pool } from 'pg';

// Configuración de la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movie_series_watchlist',
    password: 'root',
    port: 5432,
});

// Función para hacer consultas a la base de datos
export const query = async (sql: string, params: any[]) => {
    try {
        const res = await pool.query(sql, params);
        return res.rows;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};
