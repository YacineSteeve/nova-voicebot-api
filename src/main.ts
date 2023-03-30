import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './config/env-config';
import './config/multi-processing';
import { connection } from './database';
import { apiRouter, userRouter, supportRouter } from './routes';
import { authorizeApiRequest } from './middlewares';

const PORT: string | number = process.env.PORT || 5000;

const app: Express = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.send('Welcome to the NOVA API!');
});

app.use('/user', userRouter);

app.use('/support', supportRouter);

app.use('/api', authorizeApiRequest);

app.use('/api', apiRouter);

app.listen(PORT, async () => {
    const db = await connection;
    console.log(
        `\n> Connected to the ${db.connection.name.toUpperCase()} database.` +
        `\n> Server listening on port ${PORT}\n`
    );
});
