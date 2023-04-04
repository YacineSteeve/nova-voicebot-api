import '@config/env-config';
import transport from '@services/support/transporter/transport';

describe('src/services/support/transporter/transport', () => {
    test('should be defined', () => {
        expect(transport).toBeTruthy();
    });

    test('should be an object', () => {
        expect(typeof transport).toBe('object');
    });

    test('should contain valid transport options', () => {
        const requiredKeys = ['service', 'port', 'host', 'auth', 'secure'];

        requiredKeys.forEach((key) => {
            expect(transport).toHaveProperty(key);
        });

        expect(transport.auth).toHaveProperty('user');
        expect(transport.auth).toHaveProperty('pass');

        Object.values(transport).forEach((value) => {
            expect(value).toBeTruthy();
        });
    });

    test('should use environment variables for SMTP credentials', () => {
        expect(transport.auth.user).toBeTruthy();
        expect(transport.auth.pass).toBeTruthy();
    });

    test('should use Gmail SMTP service', () => {
        expect(transport.service).toBe('gmail');
    });

    test('should use port 465', () => {
        expect(transport.port).toBe(465);
    });

    test('should use SMTP host "smtp.gmail.com"', () => {
        expect(transport.host).toBe('smtp.gmail.com');
    });

    test('should use secure SMTP transport', () => {
        expect(transport.secure).toBe(true);
    });
});
