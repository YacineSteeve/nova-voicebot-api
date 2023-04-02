import type { Request, Response } from 'express';
import apiService from '@services/api';

export async function getCompletion(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    try {
        const completionResponse = await apiService.completion(
            {
                prompt: request.body.prompt,
                user: request.body.user,
            },
            request.get('authorization')?.substring(7),
        );

        response.status(completionResponse.status).json(completionResponse.data);
    } catch (error) {
        response.status(500).json({
            success: false,
            error: 'ERROR: ' + error,
        });
    }
}
