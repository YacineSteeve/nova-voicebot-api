import * as Bcrypt from 'bcryptjs';
import { User } from '@models/user';

interface RequestData {
    email: string;
    password: string;
}

export async function createUser(data: RequestData): Promise<ServiceResponse> {
    const { email, password } = data;

    if (!email || email === '') {
        return {
            status: 400,
            data: {
                success: false,
                error: 'ERROR: Missing email to sign up.',
                fields: ['email'],
            },
        };
    }

    if (!password || password === '') {
        return {
            status: 400,
            data: {
                success: false,
                error: 'ERROR: Missing password to sign up.',
                fields: ['password'],
            },
        };
    }

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return {
                status: 400,
                data: {
                    success: false,
                    error: 'ERROR: User already exists.',
                    fields: ['email'],
                },
            };
        }

        const newUser = new User({
            username: email.substring(0, email.lastIndexOf('@')),
            email: email,
            password: password,
        });

        const validationError = newUser.validateSync();

        if (validationError) {
            return {
                status: 400,
                data: {
                    success: false,
                    error: 'ERROR: ' + validationError,
                    fields: Object.keys(validationError.errors),
                },
            };
        }

        const user = await User.create({
            username: email.substring(0, email.lastIndexOf('@')),
            email: email,
            password: Bcrypt.hashSync(password, 10),
        });

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
                error: 'ERROR: ' + error,
            },
        };
    }
}
