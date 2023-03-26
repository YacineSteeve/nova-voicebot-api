import type { Request, Response } from 'express';
import { redirectSpeech } from '../redirections';

export function getSpeech(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    const queryParams = {
        text: request.body.text,
        lang: request.body.lang,
        speed: request.body.speed,
        codec: request.body.codec,
        format: request.body.format,
        b64: request.body.b64,
    }

    if (!queryParams.text || queryParams.text === '') {
        response
            .status(400)
            .json({
                success: false,
                error: 'ERROR: Missing `text` parameter to speech request.'
            });
        return
    }

    redirectSpeech(queryParams)
        .then(speechResponse => {
            if (speechResponse.data.includes('ERROR: ')) {
                response
                    .status(500)
                    .json({
                        success: false,
                        error: speechResponse.data
                    });
                return;
            }

            response.json({
                success: true,
                speech: speechResponse.data
            });
        })
        .catch(error => {
            response
                .status(500)
                .json({
                    success: false,
                    error: 'ERROR: ' + error
                });
        });
}
