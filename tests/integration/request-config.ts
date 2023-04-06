import * as supertest from 'supertest';
import app from '@src/app';
import * as JWT from 'jsonwebtoken';

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
