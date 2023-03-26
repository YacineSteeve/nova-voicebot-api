import type { Request, Response } from 'express';
import * as Bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import { User } from '../../database';

export function getUser(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    if (!request.body.email || request.body.email === '') {
        response
            .status(400)
            .json({
                success: false,
                error: 'ERROR: Missing email address to login.',
                fields: ['email']
            });
        return
    }

    if (!request.body.password || request.body.password === '') {
        response
            .status(400)
            .json({
                success: false,
                error: 'ERROR: Missing password to login.',
                fields: ['password']
            });
        return
    }

    User.findOne({email: request.body.email})
        .then(user => {
            if (!user) {
                response
                    .status(400)
                    .json({
                        success: false,
                        error: 'ERROR: User not found.',
                        fields: ['email']
                    });
                return
            }

            if (!Bcrypt.compareSync(request.body.password, user.password)) {
                response
                    .status(403)
                    .json({
                        success: false,
                        error: 'ERROR: Wrong password.',
                        fields: ['password']
                    });
                return
            }

            const token = JWT.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            response.json({
                success: true,
                token
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

export function getUserByToken(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    if (!request.body.token || request.body.token === '') {
        response
            .status(401)
            .json({
                success: false,
                error: 'ERROR: Missing authentication token. Use /user/login to get one.'
            });
        return
    }

    const token = request.body.token as string;
    let decoded: any = null;

    try {
        decoded = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        response
            .status(500)
            .json({
                success: false,
                error: 'ERROR: Unable to verify token: ' + error
            });
        return
    }

    if (!decoded) {
        response
            .status(403)
            .json({
                success: false,
                error: 'ERROR: Invalid token.'
            });
        return
    }

    User.findOne({_id: decoded.id}).then(user => {
        if (!user) {
            response
                .status(400)
                .json({
                    success: false,
                    error: 'ERROR: User not found.',
                });
            return
        }

        response.json({
            success: true,
            user: {
                username: user.username,
                email: user.email,
            }
        });
    })
}
