import '@config/env-config';
import { request, testUserCredentials, authToken } from '@tests/integration/request-config.test';
import { User } from '@models/user';
import { connection } from '@database/index';
import type { Mongoose } from 'mongoose';

describe('src/controllers/user/userinfo', () => {
    describe('POST /user/userinfo', () => {
        let database: Mongoose;

        beforeAll(async () => {
            database = await connection;
        });

        afterAll(async () => {
            await User.deleteMany({ email: testUserCredentials.email });
            await database.connection.close();
        });

        describe('valid data', () => {
            test('should userinfo user with the right data', async () => {
                await request.post('/user/signup').send(testUserCredentials);

                const response = await request.post('/user/userinfo').send({
                    token: authToken
                })

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
                        token: ''
                    },
                    {},
                ];

                test.each(
                    invalidData
                )(`should return error if parameter is missing`, async (data) => {
                    const response = await request.post('/user/userinfo').send(data);

                    expect(response.status).toEqual(401);
                    expect(response.body).toEqual(expect.objectContaining({
                        success: false,
                        error: expect.stringContaining('Missing authentication token'),
                    }));
                });
            });

            describe('invalid token', () => {
                const invalidData = [
                    {
                        token: authToken.substring(0, 7)
                    },
                    {
                        token: authToken.substring(0, authToken.length - 2)
                    },
                    {
                        token: 'a' + authToken
                    },
                    {
                        token: authToken + '1'
                    }
                ];

                test.each(
                    invalidData
                )('should return error if token is invalid', async (data) => {
                    const response = await request.post('/user/userinfo').send(data);

                    expect(response.status).toEqual(403);
                    expect(response.body).toEqual({
                        success: false,
                        error: expect.any(String)
                    });
                });
            });

            describe('doesn\'t exists', () => {
                test('should return error if user doesn\'t exists', async () => {
                    await User.deleteMany({ email: testUserCredentials.email });

                    const response = await request.post('/user/userinfo')
                        .send({
                            token: authToken
                        });

                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({
                        success: false,
                        error: expect.stringContaining('User not found'),
                    });
                });
            });
        });
    });
});
