import '@config/env-config';
import { request, authToken } from '@tests/integration/request-config.test';

jest.mock('@services/api/redirections/completion');

const {
    redirectCompletion: redirectCompletionMocked,
    redirectModeration: redirectModerationMocked
} = require('@services/api/redirections/completion');


describe('src/controllers/api/completion', () => {
    describe('POST /api/completion', () => {
        beforeAll(() => {
            jest.clearAllMocks();
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        describe('valid data', () => {
            test('should return an error if the prompt is flagged', async () => {
                redirectModerationMocked.mockImplementationOnce(async () => {
                    return {
                        data: {
                            results: [{ category_scores: { 'test': 0.1, }, flagged: true }]
                        }
                    }
                });

                const response = await request.post('/api/completion')
                    .send({
                        prompt: 'test',
                        user: authToken,
                    })
                    .set('Authorization', `Bearer ${authToken}`);

                expect(response.status).toEqual(451);
                expect(response.body).toEqual({
                    success: false,
                    error: 'ERROR: Prompt is not suitable for completion.',
                    categories: expect.any(Array),
                });
            });

            test('should retrieve completion with the right data', async () => {
                redirectModerationMocked.mockImplementationOnce(async () => {
                    return {
                        data: {
                            results: [{ category_scores: { 'test': 0, } }]
                        }
                    }
                });

                redirectCompletionMocked.mockImplementationOnce(async () => {
                    return {
                        data: {} as CompletionResponse
                    };
                });

                const response = await request.post('/api/completion')
                    .send({
                        prompt: 'test',
                        user: authToken,
                    })
                    .set('Authorization', `Bearer ${authToken}`)

                expect(response.status).toEqual(200);
                expect(response.body).toEqual({
                    success: true,
                    completion: expect.any(Object),
                });
            });
        });

        describe('invalid data', () => {
            const invalidTestData = [
                {
                    prompt: '',
                    user: authToken,
                },
                {
                    user: authToken,
                },
                {
                    prompt: 'test',
                    user: '',
                },
                {
                    prompt: 'test',
                },
                {},
            ];

            test.each(
                invalidTestData
            )('should return an error if the data is invalid', async (data) => {
                const response = await request.post('/api/completion')
                    .send(data)
                    .set('Authorization', `Bearer ${authToken}`);

                expect(response.status).toEqual(400);
                expect(response.body).toEqual({
                    success: false,
                    error: expect.any(String),
                });
            });
        });
    });
});
