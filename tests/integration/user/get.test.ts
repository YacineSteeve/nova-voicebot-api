import '@config/env-config';
import { request, testUserCredentials } from '@tests/integration/request-config';
import { User } from '@models/user';
import { connection } from '@database/index';
import type { Mongoose } from 'mongoose';

describe('src/controllers/user/login', () => {
    describe('POST /user/login', () => {
        let database: Mongoose;

        beforeAll(async () => {
            database = await connection;
        });

        afterAll(async () => {
            await User.deleteMany({ email: testUserCredentials.email });
            await database.connection.close();
        });

        describe('valid data', () => {
            test('should retrieve user with the right data', async () => {
                await request.post('/user/signup').send(testUserCredentials);
                const response = await request.post('/user/login').send(testUserCredentials)

                expect(response.status).toEqual(200);
                expect(response.body).toEqual({
                    success: true,
                    token: expect.any(String),
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
                    const response = await request.post('/user/login').send(data);

                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({
                        success: false,
                        error: expect.stringContaining('Missing'),
                        fields: expect.any(Array),
                    });
                });
            });

            describe('wrong password', () => {
                const invalidData = [
                    {
                        email: testUserCredentials.email,
                        password: testUserCredentials.password + '2'
                    },
                    {
                        email: testUserCredentials.email,
                        password: testUserCredentials.password.substring(0, 7)
                    },
                ];

                test.each(
                    invalidData
                )(`should return error if password is wrong`, async (data) => {
                    const response = await request.post('/user/login').send(data);

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
                    const response = await request.post('/user/login')
                        .send({
                            email: testUserCredentials.email + '2',
                            password: testUserCredentials.password
                        });

                    expect(response.status).toEqual(400);
                    expect(response.body).toEqual({
                        success: false,
                        error: expect.stringContaining('User not found'),
                        fields: ['email']
                    });
                });
            });
        });
    });
});
