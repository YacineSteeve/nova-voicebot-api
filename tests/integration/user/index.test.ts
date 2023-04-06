import '@config/env-config';
import { request } from '@tests/integration/request-config.test';
import userController from '@controllers/user';
import userService from '@services/user';

jest.mock('@services/user');

const userServiceMocked = require('@services/user').default as jest.Mocked<typeof userService>;

const endpoints = [
    '/user/signup',
    '/user/login',
    '/user/userinfo',
    '/user/delete',
];

describe('src/controllers/user/index', () => {
    describe('Controller', () => {
        test('should be defined', () => {
            expect(userController).toBeTruthy();
        });

        test('should have the right services', () => {
            const expectedServices = [
                'signupUser',
                'loginUser',
                'infoUser',
                'deleteUser',
            ];

            expect(Object.keys(userController)).toEqual(expectedServices);
        });

        describe('Internal errors', () => {
            beforeAll(() => {
                const signupUserMocked: jest.Mock = jest.fn(async () => {
                    throw new Error('Test error');
                });

                const getUserMocked: jest.Mock = jest.fn(async () => {
                    throw new Error('Test error');
                });

                const getUserByTokenMocked: jest.Mock = jest.fn(async () => {
                    throw new Error('Test error');
                });

                const deleteUserMocked: jest.Mock = jest.fn(async () => {
                    throw new Error('Test error');
                });

                userServiceMocked.createUser.mockImplementationOnce(signupUserMocked);

                userServiceMocked.getUser.mockImplementationOnce(getUserMocked);

                userServiceMocked.getUserByToken.mockImplementationOnce(getUserByTokenMocked);

                userServiceMocked.deleteUser.mockImplementationOnce(deleteUserMocked);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });

            test.each(
                endpoints
            )(`should throw an error if the request goes wrong for endpoint %s`, async (endpoint) => {
                const response = await request.post(endpoint).send({});

                expect(response.status).toEqual(500);
                expect(response.body).toEqual({
                    success: false,
                    error: 'ERROR: Test error',
                });
            });
        });
    });
});
