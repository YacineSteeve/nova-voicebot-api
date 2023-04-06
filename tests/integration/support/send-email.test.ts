import '@config/env-config';
// import supportService from '@services/support';
import { request } from '@tests/integration/request-config';

jest.mock('@services/support/mail');

const { mail: mailMocked } = require('@services/support/mail');

describe('src/controllers/support', () => {
    describe('POST /support/contact', () => {

        beforeAll(() => {
            jest.clearAllMocks();
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        /* TODO: Fix these tests

        describe('valid data',() => {
            const validTestData = [
                {
                    email: 'test@test.com',
                    message: 'test message',
                    subject: 'test subject',
                    name: 'test name',
                },
                {
                    email: 'test@test.com',
                    message: 'test message',
                }
            ]

            test.each(
                validTestData
            )('should send an email with the right data',async (data) => {
                const response = await request.post('/support/contact').send(data);

                expect(response.status).toEqual(200);
                expect(response.body).toEqual({
                    success: true,
                    message: 'Message sent successfully',
                    info: {
                        messageId: 'test',
                    }
                });
            }, 10000);
        });

        describe('invalid data', () => {
            beforeAll(() => {
                jest.restoreAllMocks();
            });

            const invalidTestData = [
                {
                    email: '',
                    message: 'test message',
                    subject: 'test subject',
                    name: 'test name',
                },
                {
                    message: 'test message',
                    subject: 'test subject',
                    name: 'test name',
                },
                {
                    email: 'test@test.com',
                    message: '',
                },
                {
                    email: 'test@test.com',
                },
                {},
            ];

            test.each(
                invalidTestData
            )('should return an error if the data is invalid', async(data) => {
                const response = await request.post('/support/contact').send(data);

                expect(response.status).toEqual(400);
                expect(response.body).toEqual(expect.objectContaining({
                    success: false,
                    error: expect.stringContaining('is required'),
                }));
            });
        });

        */

        test('should throw an error if the request goes wrong',async () => {
            mailMocked.mockImplementationOnce(async () => {
                throw new Error('Test error');
            });

            const response = await request.post('/support/contact').send({})

            expect(response.status).toEqual(500);
            expect(response.body).toEqual({
                success: false,
                error: 'ERROR: Test error',
            });
        });
    });
});
