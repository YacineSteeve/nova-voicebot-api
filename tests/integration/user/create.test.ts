import '@config/env-config';
import { request, testUserCredentials } from '@tests/integration/request-config';
import { User } from '@models/user';
import { connection } from '@database/index';
import type { Mongoose } from 'mongoose';

describe('src/controllers/user/signup', () => {
    describe('POST /user/signup', () => {
        let database: Mongoose;

        beforeAll(async () => {
            database = await connection;
        });

        afterAll(async () => {
            await User.deleteMany({ email: testUserCredentials.email });
            await database.connection.close();
        });

        describe('valid data', () => {
            test('should create user with the right data', async () => {
                const response = await request.post('/user/signup').send(testUserCredentials)

                expect(response.status).toEqual(200);
                expect(response.body).toEqual({
                    success: true,
                    user: {
                        username: testUserCredentials.username,
                        email: testUserCredentials.email,
                    }
                });
            });
        });

        describe('invalid data', () => {
            describe('missing', () => {
                const invalidData = [
                    {
                        email: testUserCredentials.email,
                        password: ''
                    },
                    {
                        email: testUserCredentials.email
                    },
                    {
                        email: '',
                        password: testUserCredentials.password
                    },
                    {
                        password: testUserCredentials.password
                    },
                    {
                        email: '',
                        password: ''
                    },
                    {},
                ];

                test.each(
                    invalidData
                )(`should return error if parameter is missing`, async (data) => {
                    const response = await request.post('/user/signup').send(data);

                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({
                        success: false,
                        error: expect.stringContaining('Missing'),
                        fields: expect.any(Array),
                    });
                });
            });

            describe('invalid password', () => {
                const invalidData = [
                    {
                        email: testUserCredentials.email + '2',
                        password: 'pwd_without_uppercase_1'
                    },
                    {
                        email: testUserCredentials.email + '2',
                        password: 'PWD_WITHOUT_LOWERCASE_1'
                    },
                    {
                        email: testUserCredentials.email + '2',
                        password: 'pwd_WITHOUT_number'
                    },
                    {
                        email: testUserCredentials.email + '2',
                        password: 'PwdWithoutSpecialChar1'
                    },
                    {
                        email: testUserCredentials.email + '2',
                        password: '<8Chars'
                    }
                ];

                test.each(
                    invalidData
                )(`should return error if password is invalid`, async (data) => {
                    const response = await request.post('/user/signup').send(data);

                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({
                        success: false,
                        error: expect.stringContaining('ERROR'),
                        fields: expect.any(Array),
                    });
                });
            });

            describe('already exists', () => {
                test('should return error if user already exists', async () => {
                    const response = await request.post('/user/signup').send(testUserCredentials);

                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({
                        success: false,
                        error: expect.stringContaining('User already exists'),
                        fields: ['email']
                    });
                });
            });
        });
    });
});
