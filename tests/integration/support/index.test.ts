import supportController from '@controllers/support';


describe('src/controllers/support', () => {
    describe('Controller', () => {
        test('should be defined', () => {
            expect(supportController).toBeTruthy();
        });

        test('should have the right services', () => {
            const expectedServices = ['sendEmail'];

            expect(Object.keys(supportController)).toEqual(expectedServices);
        });
    });
});
