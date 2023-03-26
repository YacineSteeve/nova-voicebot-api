import type { Request, Response } from 'express';
import * as Bcrypt from 'bcryptjs';
import { User } from '../../database';

export function createUser(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    if (!request.body.email || !request.body.password) {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Missing credentials parameter to signup.'
            });
        return
    }

    User.findOne({email: request.body.email})
        .then(user => {
            if (user) {
                response
                    .status(500)
                    .json({
                        success: false,
                        error: 'SERVER ERROR: User already exists',
                        fields: ['email']
                    })
                return
            }

            const newUser = new User({
                username: request.body.username
                    ? request.body.username
                    : request.body.email.substring(0, request.body.email.lastIndexOf('@')),
                email: request.body.email,
                password: request.body.password
            })

            const validationError = newUser.validateSync()

            if (validationError) {
                response
                    .status(500)
                    .json({
                        success: false,
                        error: 'SERVER ERROR: ' + validationError,
                        fields: Object.keys(validationError.errors)
                    })
                return
            }

            User.create({
                username: request.body.username
                    ? request.body.username
                    : request.body.email.substring(0, request.body.email.lastIndexOf('@')),
                email: request.body.email,
                password: Bcrypt.hashSync(request.body.password, 10),
            }).then(user => {
                response
                    .status(201)
                    .json({
                        success: true,
                        user: {
                            username: user.username,
                            email: user.email
                        }
                    });
            }).catch(error => {
                response
                    .status(500)
                    .json({
                        success: false,
                        error: 'SERVER ERROR: ' + error
                    });
            })
        }).catch(error => {
            response
                .status(500)
                .json({
                    success: false,
                    error: 'SERVER ERROR: ' + error
                });
        });
}
