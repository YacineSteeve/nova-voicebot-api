import cache from '@cache/index';
import NodeCache from 'node-cache';

describe('src/cache', () => {
    test('cache object should be defined', () => {
        expect(cache).toBeDefined();
    });

    test('cache should be a NodeCache object', () => {
        expect(cache).toBeInstanceOf(NodeCache);
    });

    describe('setting and getting keys', () => {
        const testCase = {
            key: 'myKey',
            value: 'myValue',
        };

        beforeAll(() => {
            cache.set(testCase.key, testCase.value);
        });

        afterAll(() => {
            cache.del(testCase.key);
        });

        test('key should be present in cache', () => {
            expect(cache.keys()).toContain(testCase.key);
            expect(cache.has(testCase.key)).toBe(true);
        });

        test('key should have a value', () => {
            expect(cache.get(testCase.key)).toBeDefined();
        });

        test('key should have the right value', () => {
            expect(cache.get(testCase.key)).toEqual(testCase.value);
        });

        test("key's value should have the right type", () => {
            expect(typeof cache.get(testCase.key)).toBe(typeof testCase.value);
        });

        test('cached value should have an expiration time', () => {
            expect(cache.getTtl(testCase.key)).not.toBe(0);
            expect(cache.getTtl(testCase.key)).not.toBe(undefined);
        });
    });

    describe('expiration', () => {
        const testCase = {
            key: 'myKey',
            value: 'myValue',
        };

        beforeAll(() => {
            cache.set(testCase.key, testCase.value);
        });

        afterAll(() => {
            cache.del(testCase.key);
        });

        test('cached element should expire', () => {
            cache.ttl(testCase.key, 1000);

            setTimeout(() => {
                expect(cache.get(testCase.key)).toBe(undefined);
            }, 1000);
        });
    });
});
