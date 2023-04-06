import type { Request } from 'express';
import createControllerMethod from '@controllers/controller';
import userService from '@services/user';

export const loginUser = createControllerMethod(async (request: Request) => {
    return await userService.getUser({
        email: request.body.email,
        password: request.body.password,
    });
});
