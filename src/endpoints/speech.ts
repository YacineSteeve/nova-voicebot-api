import type { Request, Response } from 'express';
import { redirectSpeech } from '../redirections';

export function getSpeech(request: Request, response: Response) {
    request.accepts('text/plain');
    response.type('application/json');

    const queryParams = {
        text: request.query['text'] as string,
        lang: request.query['lang'] as string,
        speed: request.query['speed'] as string,
        codec: request.query['codec'] as string,
        format: request.query['format'] as string,
        b64: request.query['b64'] as string,
    }

    if (!queryParams.text || queryParams.text === '') {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Missing `text` parameter to speech request.'
            });
        return
    }

    redirectSpeech(queryParams)
        .then(speechResponse => {
            response.json({
                success: true,
                speech: speechResponse.data
            });
        })
        .catch(error => {
            response
                .status(error.response.status)
                .json({
                    success: false,
                    error: `${error.response.statusText.toUpperCase()}: ` +
                    `Invalid language '${JSON.parse(error.response.config.data).lang}'`
                });
        });
}
