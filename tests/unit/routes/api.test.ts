import apiRouter from '@routes/api';

describe('src/router/api', () => {
    test('apiRouter should be defined', () => {
        expect(apiRouter).toBeDefined();
    });

    test('apiRouter should be a function', () => {
        expect(typeof apiRouter).toBe('function');
    });

    describe('defined routes', () => {
        const expectedRoutes = [
            {path: '/completion', method: 'post'},
            {path: '/speech', method: 'post'},
        ];

        test(`apiRouter should have ${expectedRoutes.length} routes defined`, () => {
            expect(apiRouter.stack).toHaveLength(expectedRoutes.length);
        });

        expectedRoutes.forEach((route) => {
            test(`apiRouter should have the ${route.method.toUpperCase()} ${route.path} route defined`,
                () => {
                    expect(apiRouter.stack).toContainEqual(expect.objectContaining({
                        route: expect.objectContaining({
                            path: route.path,
                            methods: expect.objectContaining({
                                [route.method]: true,
                            }),
                        }),
                    }));
                });

            test(`apiRouter should have a ${route.path} route handler defined`, () => {
                expect(apiRouter.stack).toContainEqual(expect.objectContaining({
                    handle: expect.any(Function),
                }));
            });
        });
    });
});
