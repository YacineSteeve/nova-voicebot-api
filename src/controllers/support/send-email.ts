import type { Request, Response } from 'express';
import supportService from '@services/support';

export async function sendEmail(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    try {
        const result = await supportService.mail(request.body);

        response.status(result.status).json(result);
    } catch (error) {
        response.status(500).json({
            success: false,
            error: 'ERROR: ' + error,
        });
    }
}
