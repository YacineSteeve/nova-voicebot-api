import {createTransport} from 'nodemailer';
import transport from './transport';

const transporter = createTransport(transport);

export { transporter, transport };
