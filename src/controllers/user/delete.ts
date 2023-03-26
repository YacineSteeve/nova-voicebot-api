import type { Request, Response } from 'express';
import * as Bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import { User } from '../../database';

export function deleteUser(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    if (!request.body.token || request.body.token === '') {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Missing token to delete user.',
            });
        return;
    }

    if (!request.body.password || request.body.password === '') {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Missing password to delete user.',
                fields: ['password'],
            });
        return;
    }

    const token = request.body.token;
    let decoded: any = null;

    try {
        decoded = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Unable to verify token. ' + error,
            });
        return;
    }

    if (!decoded) {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Invalid token.',
            });
        return;
    }

    User.findOne({ _id: decoded.id })
        .then(user => {
            if (!user) {
                response
                    .status(500)
                    .json({
                        success: false,
                        error: 'SERVER ERROR: User not found.',
                    });
                return;
            }

            if (!Bcrypt.compareSync(request.body.password, user.password)) {
                response
                    .status(500)
                    .json({
                        success: false,
                        error: 'SERVER ERROR: Wrong password.',
                        fields: ['password'],
                    });
                return;
            }

            User.deleteOne({ _id: decoded.id })
                .then(() => {
                    response
                        .json({
                            success: true,
                        });
                })
                .catch(error => {
                    response
                        .status(500)
                        .json({
                            success: false,
                            error: 'SERVER ERROR: Unable to delete user. ' + error,
                        });
                });
        })
        .catch(error => {
            response
                .status(500)
                .json({
                    success: false,
                    error: 'SERVER ERROR: Unable to find user. ' + error,
                });
        });
}
