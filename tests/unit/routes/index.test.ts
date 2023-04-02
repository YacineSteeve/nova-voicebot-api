import { apiRouter, userRouter, supportRouter } from '@routes/index';

describe('src/router/index', () => {
    test('apiRouter should be defined', () => {
        expect(apiRouter).toBeDefined();
    });

    test('userRouter should be defined', () => {
        expect(userRouter).toBeDefined();
    });

    test('supportRouter should be defined', () => {
        expect(supportRouter).toBeDefined();
    });
});
