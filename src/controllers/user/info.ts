import { Request } from 'express';
import createControllerMethod from '@controllers/controller';
import userService from '@services/user';

export const infoUser = createControllerMethod(async (request: Request) => {
    return await userService.getUserByToken({
        token: request.body.token,
    });
});
