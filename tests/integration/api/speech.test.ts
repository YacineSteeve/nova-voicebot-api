import '@config/env-config';
import { request, authToken } from '@tests/integration/request-config';

jest.mock('@services/api/redirections/speech');

const { redirectSpeech: redirectSpeechMocked } = require('@services/api/redirections/speech');


describe('src/controllers/api/speech', () => {
    describe('POST /api/speech', () => {
        beforeAll(() => {
            jest.clearAllMocks();
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        describe('valid data', () => {
            const validTestData = [
                {
                    text: 'test',
                },
                {
                    text: 'test',
                    lang: 'en-US',
                },
                {
                    text: 'test',
                    codec: 'wav',
                },
                {
                    text: 'test',
                    b64: false,
                }
            ]

            test.each(
                validTestData
            )('should retrieve speech with the right data', async (data) => {
                redirectSpeechMocked.mockImplementationOnce(async () => {
                    return {
                        data: 'test'
                    };
                });

                const response = await request.post('/api/speech')
                    .send(data)
                    .set('Authorization', `Bearer ${authToken}`)

                expect(response.status).toEqual(200);
                expect(response.body).toEqual({
                    success: true,
                    speech: data.b64
                        ? expect.stringContaining('data:audio/wav;base64,')
                        : expect.any(String),
                });
            });
        });

        describe('invalid data', () => {
            const invalidTestData = [
                {
                    text: '',
                },
                {
                    lang: 'en-US',
                },
                {
                    text: '',
                    lang: 'en-US',
                },
                {
                    lang: 'en-US',
                    codec: 'wav',
                },
                {},
            ];

            test.each(
                invalidTestData
            )('should return an error if the data is invalid', async (data) => {
                const response = await request.post('/api/speech')
                    .send(data)
                    .set('Authorization', `Bearer ${authToken}`);

                expect(response.status).toEqual(400);
                expect(response.body).toEqual({
                    success: false,
                    error: 'ERROR: Missing `text` parameter to speech request.',
                });
            });
        });
    });
});
