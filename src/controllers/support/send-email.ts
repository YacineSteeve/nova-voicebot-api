import type { Request, Response } from 'express';
import supportService from '@services/support';

export async function sendEmail(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    try {
        const sendEmailResponse = await supportService.mail(request.body);

        response.status(sendEmailResponse.status).json(sendEmailResponse.data);
    } catch (error) {
        response.status(500).json({
            success: false,
            error: 'ERROR: ' + error.message,
        });
    }
}
