import type { Request } from 'express';
import createControllerMethod from '@controllers/controller';
import userService from '@services/user';

export const signupUser = createControllerMethod(async (request: Request) => {
    return await userService.createUser({
        email: request.body.email,
        password: request.body.password,
    });
});
