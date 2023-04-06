import type { Request } from 'express';
import createControllerMethod from '@controllers/controller';
import apiService from '@services/api';

export const getCompletion = createControllerMethod(async (request: Request) => {
    return await apiService.completion(
        {
            prompt: request.body.prompt,
            user: request.body.user,
        },
        request.get('authorization')?.substring(7),
    )
});
