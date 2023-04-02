import { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required.'],
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required.'],
            validate: [
                {
                    validator: function (value: string) {
                        return value.length >= 8;
                    },
                    message: 'Password must be at least 8 characters long.',
                },
                {
                    validator: function (value: string) {
                        return /[A-Z]/.test(value);
                    },
                    message: 'Password must contain at least one uppercase letter.',
                },
                {
                    validator: function (value: string) {
                        return /[a-z]/.test(value);
                    },
                    message: 'Password must contain at least one lowercase letter.',
                },
                {
                    validator: function (value: string) {
                        return /[0-9]/.test(value);
                    },
                    message: 'Password must contain at least one digit.',
                },
                {
                    validator: function (value: string) {
                        return /[!@#\][:()"`;+\-'|_?,.</\\>=$%}{^&*~]/.test(value);
                    },
                    message: 'Password must contain at least one special character.',
                },
            ],
        },
        role: {
            type: String,
            enum: ['normal', 'admin'],
            default: 'normal',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: 'users',
    },
);

export default userSchema;
