import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie Watchlist API',
            version: '1.0.0',
            description: 'API for managing movies and TV shows watchlists',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Rutas donde añades las anotaciones Swagger
};

const swaggerSpec = swaggerJsdoc(options);


export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger docs available at http://localhost:3000/api-docs');
};
