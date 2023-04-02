import { apiRouter, userRouter, supportRouter } from '@routes/index';

describe('src/router/index', () => {
    test('apiRouter should be exported', () => {
        expect(apiRouter).toBeTruthy();
    });

    test('userRouter should be exported', () => {
        expect(userRouter).toBeTruthy();
    });

    test('supportRouter should be exported', () => {
        expect(supportRouter).toBeTruthy();
    });
});
