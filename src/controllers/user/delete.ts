import type { Request } from 'express';
import createControllerMethod from '@controllers/controller';
import userService from '@services/user';

export const deleteUser = createControllerMethod(async (request: Request) => {
    return await userService.deleteUser({
        token: request.body.token,
        password: request.body.password,
    });
});
