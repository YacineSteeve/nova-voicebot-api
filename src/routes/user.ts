import { Router } from 'express';
import userController from '@controllers/user';

const userRouter = Router();

userRouter.post('/userinfo', userController.infoUser);

userRouter.post('/login', userController.loginUser);

userRouter.post('/signup', userController.signupUser);

userRouter.post('/delete', userController.deleteUser);

export default userRouter;
