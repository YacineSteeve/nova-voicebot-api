import * as process from 'process';

const transport = {
    service: 'gmail',
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    secure: true,
}

export default transport;
