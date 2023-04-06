import * as Bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { User } from '@models/user';

interface RequestData {
    token: string;
    password: string;
}

export async function deleteUser(data: RequestData): Promise<ServiceResponse> {
    const { token, password } = data;

    if (!token || token === '') {
        return {
            status: 401,
            data: {
                success: false,
                error: 'ERROR: Missing token to delete user. Please login again.',
            },
        };
    }

    if (!password || password === '') {
        return {
            status: 401,
            data: {
                success: false,
                error: 'ERROR: Missing password to delete user.',
                fields: ['password'],
            },
        };
    }

    let decoded: JwtPayload = null;

    try {
        decoded = JWT.verify(token, process.env.JWT_SECRET) as JwtPayload;
    } catch (error) {
        return {
            status: 500,
            data: {
                success: false,
                error: 'ERROR: Unable to verify token: ' + error,
            },
        };
    }

    if (!decoded) {
        return {
            status: 403,
            data: {
                success: false,
                error: 'ERROR: Invalid token.',
            },
        };
    }

    try {
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return {
                status: 400,
                data: {
                    success: false,
                    error: 'ERROR: User not found.',
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

        await User.deleteOne({ email: decoded.email });

        return {
            status: 200,
            data: {
                success: true,
            },
        };
    } catch (error) {
        return {
            status: 500,
            data: {
                success: false,
                error: 'ERROR: Unable to find or delete user: ' + error,
            },
        };
    }
}
