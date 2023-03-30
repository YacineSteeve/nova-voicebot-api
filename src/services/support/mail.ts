import type { SendMailOptions } from 'nodemailer';
import * as process from 'process';
import { transporter } from './transporter';
import { contactEmailTemplate } from './templates';
import type { ServiceResponse } from '../../types';

interface RequestData {
    email: string;
    message: string;
    subject?: string;
    name?: string;
}

export async function mail(data: RequestData): Promise<ServiceResponse> {
    const { email, message, subject, name } = data;
    let response: ServiceResponse = null;

    if (!email || email === '') {
        return {
            status: 400,
            data: {
                success: false,
                error: 'ERROR: Email is required',
                fields: ['email'],
            },
        };
    }

    if (!message || message === '') {
        return {
            status: 400,
            data: {
                success: false,
                error: 'ERROR: Message is required',
                fields: ['message'],
            },
        };
    }

    let canSendEmail: boolean = true;

    transporter.verify((error) => {
        if (error) {
            canSendEmail = false;

            response = {
                status: 500,
                data: {
                    success: false,
                    error: 'ERROR: Message can not be sent: ' + error.message,
                }
            };
        }
    });

    if (!canSendEmail) {
        return response;
    }

    const mailOptions: SendMailOptions = {
        to: process.env.SMTP_TO_EMAIL,
        replyTo: email,
        subject: subject || 'New message from Nova user',
        text: message,
        html: contactEmailTemplate({
            email: email,
            name: name,
            subject: subject || 'Unspecified',
            content: message,
        }),
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            response = {
                status: 500,
                data: {
                    success: false,
                    error: 'ERROR: Message can not be sent: ' + error.message,
                }
            };

            return;
        }

        response = {
            status: 200,
            data: {
                success: true,
                message: 'Message sent successfully',
                info,
            }
        }
    });

    return response;
}
