import * as JWT from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { User } from '@models/user';

interface RequestData {
    token: string;
}

export async function getUserByToken(data: RequestData): Promise<ServiceResponse> {
    const { token } = data;

    if (!token || token === '') {
        return {
            status: 401,
            data: {
                success: false,
                error: 'ERROR: Missing authentication token. Use /user/login to get one.',
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
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            return {
                status: 400,
                data: {
                    success: false,
                    error: 'ERROR: User not found.',
                },
            };
        }

        return {
            status: 200,
            data: {
                success: true,
                user: {
                    username: user.username,
                    email: user.email,
                },
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
