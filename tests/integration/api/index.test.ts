import '@config/env-config';
import { request, authToken } from '@tests/integration/request-config';
import apiController from '@controllers/api';
import apiService from '@services/api';

jest.mock('@services/api');

const apiServiceMocked = require('@services/api').default as jest.Mocked<typeof apiService>;

const endpoints = [
    '/api/speech',
    '/api/completion',
];

describe('src/controllers/api/index', () => {
    describe('Controller', () => {
        test('should be defined', () => {
            expect(apiController).toBeTruthy();
        });

        test('should have the right services', () => {
            const expectedServices = [
                'getCompletion',
                'getSpeech',
            ];

            expect(Object.keys(apiController)).toEqual(expectedServices);
        });

        describe('unauthorized', () => {
            describe.each(
                endpoints
            )('%s', (endpoint) => {

                test('should return an error if the user is not authorized', async () => {
                    const response = await request.post(endpoint)
                        .send({});

                    expect(response.status).toEqual(401);
                    expect(response.body).toEqual({
                        success: false,
                        error: 'ERROR: Access denied. No token in authorization header.',
                    });
                });

                test('should return an error if the token is invalid', async () => {
                    const response = await request.post(endpoint)
                        .send({})
                        .set('Authorization', 'Bearer invalidToken');

                    expect(response.status).toEqual(403);
                    expect(response.body).toEqual({
                        success: false,
                        error: expect.stringContaining('ERROR: Invalid token')
                    });
                });
            });
        });

        describe('Internal errors', () => {
            beforeAll(() => {
                const speechMocked: jest.Mock = jest.fn(async () => {
                    throw new Error('Test error');
                });

                const completionMocked: jest.Mock = jest.fn(async () => {
                    throw new Error('Test error');
                });

                apiServiceMocked.speech.mockImplementationOnce(speechMocked);

                apiServiceMocked.completion.mockImplementationOnce(completionMocked);
            });

            afterAll(() => {
                jest.clearAllMocks();
            });

            test.each(
                endpoints
            )(`should throw an error if the request goes wrong for endpoint %s`, async (endpoint) => {
                const response = await request.post(endpoint)
                    .send({})
                    .set('Authorization', `Bearer ${authToken}`);

                expect(response.status).toEqual(500);
                expect(response.body).toEqual({
                    success: false,
                    error: 'ERROR: Test error',
                });
            });
        });
    });
});
