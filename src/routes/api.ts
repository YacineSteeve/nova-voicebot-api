import { Router } from 'express';
import apiController from '../controllers/api';

const apiRouter = Router();

apiRouter.post('/completion', apiController.getCompletion);

apiRouter.post('/speech', apiController.getSpeech);

export default apiRouter;
