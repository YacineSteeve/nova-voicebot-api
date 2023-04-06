import '@config/env-config';
import * as supertest from 'supertest';
import app from '@src/app';
import * as JWT from 'jsonwebtoken';

describe('Request Config', () => {
    test('should pass', () => {
        expect(1).toBe(1);
    });
});

const testUserCredentials = {
    email: 'test@test.com',
    username: 'test',
    password: 'Test_Password_123',
};

const authToken = JWT.sign({
        email: testUserCredentials.email,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '1d',
    },
);

const request = supertest.default(app);

export { request, authToken, testUserCredentials };
