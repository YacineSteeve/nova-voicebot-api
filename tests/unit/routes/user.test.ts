import userRouter from '@routes/user';

describe('src/router/user', () => {
    test('userRouter should be defined', () => {
        expect(userRouter).toBeDefined();
    });

    test('userRouter should be a function', () => {
        expect(typeof userRouter).toBe('function');
    });

    describe('defined routes', () => {
        const expectedRoutes = [
            { path: '/userinfo', method: 'post' },
            { path: '/login', method: 'post' },
            { path: '/signup', method: 'post' },
            { path: '/delete', method: 'post' },
        ];

        test(`userRouter should have ${expectedRoutes.length} routes defined`, () => {
            expect(userRouter.stack).toHaveLength(expectedRoutes.length);
        });

        expectedRoutes.forEach((route) => {
            test(`userRouter should have the ${route.method.toUpperCase()} ${
                route.path
            } route defined`, () => {
                expect(userRouter.stack).toContainEqual(
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

            test(`userRouter should have a ${route.path} route handler defined`, () => {
                expect(userRouter.stack).toContainEqual(
                    expect.objectContaining({
                        handle: expect.any(Function),
                    }),
                );
            });
        });
    });
});
