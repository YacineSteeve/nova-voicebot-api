import type { Request, Response } from 'express';
import apiService from '@services/api';

export async function getSpeech(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    try {
        const speechResponse = await apiService.speech(
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

        response.status(speechResponse.status).json(speechResponse.data);
    } catch (error) {
        response.status(500).json({
            success: false,
            error: 'ERROR: ' + error,
        });
    }
}
