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
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
// @ts-ignore
const pg_1 = require("pg");
// Configuración de la base de datos
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movie_series_watchlist',
    password: 'root',
    port: 5432,
});
// Función para hacer consultas a la base de datos
const query = (text_1, ...args_1) => __awaiter(void 0, [text_1, ...args_1], void 0, function* (text, params = []) {
    try {
        const res = yield pool.query(text, params);
        return res.rows;
    }
    catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
});
exports.query = query;
