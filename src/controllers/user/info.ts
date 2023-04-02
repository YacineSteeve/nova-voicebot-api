import { Request, Response } from 'express';
import userService from '@services/user';

export async function infoUser(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    try {
        const res = await userService.getUserByToken({
            token: request.body.token,
        });

        response.status(res.status).send(res.data);
    } catch (error) {
        response.status(500).send({
            success: false,
            error: 'ERROR: ' + error,
        });
    }
}
