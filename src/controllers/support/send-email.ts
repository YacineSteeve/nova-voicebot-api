import type { Request } from 'express';
import createControllerMethod from '@controllers/controller';
import supportService from '@services/support';

export const sendEmail = createControllerMethod(async (request: Request) => {
    return await supportService.mail(request.body);
});
