import app from '@src/app';

describe('App', () => {
    test('should be defined and exported', () => {
        expect(app).toBeTruthy();
    });

    test('should have required properties', () => {
        const requiredProperties = [
            'use',
            'get',
            'post',
            'listen',
        ];

        requiredProperties.forEach((property) => {
            expect(app).toHaveProperty(property);
        });
    });
});
