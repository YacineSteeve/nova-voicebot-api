import { Router } from 'express';
import supportController from '@controllers/support';

const supportRouter = Router();

supportRouter.post('/contact', supportController.sendEmail);

export default supportRouter;
