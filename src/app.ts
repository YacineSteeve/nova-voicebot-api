import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiRouter, userRouter, supportRouter } from './routes';
import { authorizeApiRequest } from './middlewares';

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('Welcome to the NOVA API!');
});

app.use('/user', userRouter);

app.use('/support', supportRouter);

app.use('/api', authorizeApiRequest);

app.use('/api', apiRouter);

export default app;
