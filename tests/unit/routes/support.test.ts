import supportRouter from '@routes/support';

describe('src/router/support', () => {
    test('supportRouter should be defined and exported', () => {
        expect(supportRouter).toBeTruthy();
    });

    test('supportRouter should be a function', () => {
        expect(typeof supportRouter).toBe('function');
    });

    describe('defined routes', () => {
        const expectedRoutes = [{ path: '/contact', method: 'post' }];

        test(`supportRouter should have ${expectedRoutes.length} routes defined`, () => {
            expect(supportRouter.stack).toHaveLength(expectedRoutes.length);
        });

        expectedRoutes.forEach((route) => {
            test(`supportRouter should have the ${route.method.toUpperCase()} ${
                route.path
            } route defined`, () => {
                expect(supportRouter.stack).toContainEqual(
                    expect.objectContaining({
                        route: expect.objectContaining({
                            path: route.path,
                            methods: expect.objectContaining({
                                [route.method]: true,
                            }),
                        }),
                    }),
                );
            });

            test(`supportRouter should have a ${route.path} route handler defined`, () => {
                expect(supportRouter.stack).toContainEqual(
                    expect.objectContaining({
                        handle: expect.any(Function),
                    }),
                );
            });
        });
    });
});
