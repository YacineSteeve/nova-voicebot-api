import type { Request, Response } from 'express';
import userService from '../../services/user';

export async function signupUser(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    try {
        const res = await userService.createUser({
            email: request.body.email,
            password: request.body.password
        });

        response
            .status(res.status)
            .send(res.data);
    } catch (error) {
        response
            .status(500)
            .send({
                success: false,
                error: 'ERROR: ' + error
            });
    }
}