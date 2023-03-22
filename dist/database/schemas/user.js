"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        validate: [
            {
                validator: function (value) {
                    return value.length >= 8;
                },
                message: 'Password must be at least 8 characters long.'
            },
            {
                validator: function (value) {
                    return /[A-Z]/.test(value);
                },
                message: 'Password must contain at least one uppercase letter.'
            },
            {
                validator: function (value) {
                    return /[a-z]/.test(value);
                },
                message: 'Password must contain at least one lowercase letter.'
            },
            {
                validator: function (value) {
                    return /[0-9]/.test(value);
                },
                message: 'Password must contain at least one digit.'
            },
            {
                validator: function (value) {
                    return /[!@#\][:()"`;+\-'|_?,.</\\>=$%}{^&*~]/.test(value);
                },
                message: 'Password must contain at least one special character.'
            }
        ]
    },
    role: {
        type: String,
        enum: ['normal', 'admin'],
        default: 'normal'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'users',
});
exports.default = userSchema;
//# sourceMappingURL=user.js.map