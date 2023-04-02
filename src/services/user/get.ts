import * as Bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import { User } from '../../models/user';
import type { ServiceResponse } from '../../types';

interface RequestData {
    email: string;
    password: string;
}

export async function getUser(data: RequestData): Promise<ServiceResponse> {
    const { email, password } = data;

    if (!email || email === '') {
        return {
            status: 400,
            data: {
                success: false,
                error: 'ERROR: Missing email address to login.',
                fields: ['email'],
            },
        };
    }

    if (!password || password === '') {
        return {
            status: 400,
            data: {
                success: false,
                error: 'ERROR: Missing password to login.',
                fields: ['password'],
            },
        };
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return {
                status: 400,
                data: {
                    success: false,
                    error: 'ERROR: User not found.',
                    fields: ['email'],
                },
            };
        }

        if (!Bcrypt.compareSync(password, user.password)) {
            return {
                status: 403,
                data: {
                    success: false,
                    error: 'ERROR: Wrong password.',
                    fields: ['password'],
                },
            };
        }

        const token = JWT.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            },
        );

        return {
            status: 200,
            data: {
                success: true,
                token,
            },
        };
    } catch (error) {
        return {
            status: 500,
            data: {
                success: false,
                error: 'ERROR: Unable to find user: ' + error,
            },
        };
    }
}
