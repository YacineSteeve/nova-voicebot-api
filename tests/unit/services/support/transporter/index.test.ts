import { createTransport } from 'nodemailer';
import { transporter } from '@services/support/transporter/index';

describe('src/services/support/transporter/index', () => {
    test('should export a transporter object', () => {
        expect(transporter).toBeDefined();
    });

    test('transporter should be an instance of nodemailer Transporter', () => {
        expect(typeof transporter).toEqual(typeof createTransport({}));
    });
});
