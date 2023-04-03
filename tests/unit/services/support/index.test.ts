import supportService from '@services/support';

describe('services/support/index', () => {
    test('supportService object should be defined and exported', async () => {
        expect(supportService).toBeTruthy();
    });

    test('should be an object', async () => {
        expect(typeof supportService).toEqual('object');
    });

    const services = ['mail'];

    test('should contain the right service keys', async () => {
        expect(Object.keys(supportService)).toEqual(services);
    });

    test('should contain valid service values', async () => {
        Object.values(supportService).forEach((service) => {
            expect(typeof service).toEqual('function');
        });
    });
});
