import type { Request } from 'express';
import createControllerMethod from '@controllers/controller';
import apiService from '@services/api';

export const getSpeech = createControllerMethod(async (request: Request) => {
    return await apiService.speech(
        {
            text: request.body.text,
            lang: request.body.lang,
            speed: request.body.speed,
            codec: request.body.codec,
            format: request.body.format,
            b64: request.body.b64,
        },
        request.get('authorization')?.substring(7) || '',
    );
});
