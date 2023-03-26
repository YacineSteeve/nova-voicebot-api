import type { Request, Response } from 'express';
import type {SendMailOptions} from 'nodemailer';
import * as process from 'process';
import { transporter } from './transporter';
import emailTemplate from './template';

export function sendEmail(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    if (!request.body.email || request.body.email === '') {
        response
            .status(400)
            .json({
                success: false,
                error: 'ERROR: Email is required',
                fields: ['email'],
            })
        return;
    }

    if (!request.body.message || request.body.message === '') {
        response
            .status(400)
            .json({
                success: false,
                error: 'ERROR: Message is required',
                fields: ['message'],
            })
        return;
    }

    let canSendEmail: boolean = true;

    transporter.verify((error) => {
        if (error) {
            response
                .status(500)
                .json({
                    success: false,
                    error: 'ERROR: Message can not be sent: ' + error.message,
                });

            canSendEmail = false;

            return;
        }
    });

    if (!canSendEmail) {
        return;
    }

    const mailOptions: SendMailOptions = {
        to: process.env.SMTP_TO_EMAIL,
        replyTo: request.body.email,
        subject: request.body.subject || 'New message from Nova user',
        text: request.body.message,
        html: emailTemplate({
            email: request.body.email,
            name: request.body.name,
            subject: request.body.subject || 'Unspecified',
            content: request.body.message,
        }),
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            response
                .status(500)
                .json({
                    success: false,
                    error: 'ERROR: Message can not be sent: ' + error.message,
                });
            return;
        }

        response.json({
            success: true,
            message: 'Message sent successfully',
            info,
        });
    });
}
