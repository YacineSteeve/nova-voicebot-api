import '@config/env-config';
import { request, testUserCredentials, authToken } from '@tests/integration/request-config.test';
import { User } from '@models/user';
import { connection } from '@database/index';
import type { Mongoose } from 'mongoose';

describe('src/controllers/user/delete', () => {
    describe('POST /user/delete', () => {
        let database: Mongoose;

        beforeAll(async () => {
            database = await connection;
        });

        afterAll(async () => {
            await User.deleteMany({ email: testUserCredentials.email });
            await database.connection.close();
        });

        describe('valid data', () => {
            test('should delete user with the right data', async () => {
                await request.post('/user/signup').send(testUserCredentials);

                const loginResponse = await request.post('/user/login').send(testUserCredentials);

                const { token } = loginResponse.body;

                const response = await request.post('/user/delete')
                    .send({
                        token: token,
                        password: testUserCredentials.password
                    })

                expect(response.status).toEqual(200);
                expect(response.body).toEqual({
                    success: true,
                });

                const loginResponseAfterDelete = await request.post('/user/login').send(testUserCredentials);

                expect(loginResponseAfterDelete.status).toEqual(400);
                expect(loginResponseAfterDelete.body).toEqual({
                    success: false,
                    error: expect.stringContaining('User not found'),
                    fields: ['email'],
                });

                await User.deleteMany({ email: testUserCredentials.email });
            });
        });

        describe('invalid data', () => {
            describe('missing', () => {
                const invalidData = [
                    {
                        token: authToken,
                        password: ''
                    },
                    {
                        token: authToken,
                    },
                    {
                        token: '',
                        password: testUserCredentials.password
                    },
                    {
                        password: testUserCredentials.password
                    },
                    {
                        token: '',
                        password: ''
                    },
                    {},
                ];

                test.each(
                    invalidData
                )(`should return error if parameter is missing`, async (data) => {
                    const response = await request.post('/user/delete').send(data);

                    expect(response.status).toEqual(401);
                    expect(response.body).toEqual(expect.objectContaining({
                        success: false,
                        error: expect.stringContaining('Missing'),
                    }));
                });
            });

            describe('wrong password', () => {
                beforeAll(async () => {
                    await request.post('/user/signup').send(testUserCredentials);
                });

                const invalidData = [
                    {
                        token: authToken,
                        password: testUserCredentials.password + '2'
                    },
                    {
                        token: authToken,
                        password: testUserCredentials.password.substring(0, 7)
                    },
                ];

                test.each(
                    invalidData
                )(`should return error if password is wrong`, async (data) => {
                    const response = await request.post('/user/delete').send(data);

                    expect(response.status).toEqual(403);
                    expect(response.body).toEqual({
                        success: false,
                        error: expect.stringContaining('Wrong password'),
                        fields: ['password'],
                    });
                });
            });

            describe('doesn\'t exists', () => {
                test('should return error if user doesn\'t exists', async () => {
                    await User.deleteMany({ email: testUserCredentials.email });

                    const response = await request.post('/user/delete')
                        .send({
                            token: authToken,
                            password: testUserCredentials.password
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
