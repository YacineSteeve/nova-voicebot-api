import { mail } from '@services/support/mail';
import { contactEmailTemplate } from '@services/support/templates';

jest.mock('@services/support/transporter');

const { transporter: mockedTransporter } = require('@services/support/transporter');

describe('mail function', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('missing parameters', () => {
        test('should return a 400 response if email is missing', async () => {
            const response = await mail({
                email: '',
                message: 'test',
            });

            expect(response.status).toBe(400);
            expect(response.data).toEqual({
                success: false,
                error: 'ERROR: Email is required',
                fields: ['email'],
            });
        });

        test('should return a 400 response if message is missing', async () => {
            const response = await mail({
                email: 'test@test.com',
                message: '',
            });

            expect(response.status).toBe(400);
            expect(response.data).toEqual({
                success: false,
                error: 'ERROR: Message is required',
                fields: ['message'],
            });
        });
    });

    test('should send an email with correct options', async () => {
        const sendMailMocked: jest.Mock = jest.fn((options, callback) => {
            callback(null, { messageId: 'test' });
        });

        mockedTransporter.sendMail.mockImplementationOnce(sendMailMocked);

        const data = {
            email: 'test@test.com',
            message: 'test message',
            subject: 'test subject',
            name: 'test name',
        };

        const response = await mail(data);

        expect(sendMailMocked).toHaveBeenCalledTimes(1);
        expect(sendMailMocked).toHaveBeenCalledWith({
            to: process.env.SMTP_TO_EMAIL,
            replyTo: data.email,
            subject: data.subject,
            text: data.message,
            html: contactEmailTemplate({
                email: data.email,
                name: data.name,
                subject: data.subject,
                content: data.message,
            }),
        }, expect.any(Function));

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toBe('Message sent successfully');
        expect(response.data.info).toEqual({ messageId: 'test' });
    });

    describe('internal errors',  () => {
        test('should return a 500 response if transporter can not verify', async () => {
            const verifyMocked: jest.Mock = jest.fn((callback) => {
                callback(new Error('Transporter can not verify'));
            });

            mockedTransporter.verify.mockImplementationOnce(verifyMocked);

            const response = await mail({
                email: 'test@test.com',
                message: 'test message',
            });

            expect(response.status).toBe(500);
            expect(response.data).toEqual({
                success: false,
                error: 'ERROR: Message can not be sent: Transporter can not verify',
            });
        });

        test('should return a 500 response if an error occurs while sending the email', async () => {
            const sendMailMocked: jest.Mock = jest.fn((options, callback) => {
                callback(new Error('Sending email failed'));
            });

            mockedTransporter.sendMail.mockImplementationOnce(sendMailMocked);

            const response = await mail({
                email: 'test@test.com',
                message: 'test message',
                subject: 'test subject',
                name: 'test name',
            });

            expect(response.status).toBe(500);
            expect(response.data).toEqual({
                success: false,
                error: 'ERROR: Message can not be sent: Sending email failed',
            });
        });
    });
});
