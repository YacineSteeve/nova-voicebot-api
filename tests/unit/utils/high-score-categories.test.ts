import highScoreCategories from '@utils/high-score-categories';

describe('src/utils/highScoreCategories', () => {
    test('highScoreCategories should be defined', () => {
        expect(highScoreCategories).toBeDefined();
    });

    test('highScoreCategories should be a function', () => {
        expect(highScoreCategories).toBeInstanceOf(Function);
    });

    test('should pass for {} and 0', () => {
        expect(highScoreCategories({}, 0)).toEqual({
            found: expect.any(Boolean),
            categories: expect.any(Array),
        });
    });

    describe('passing cases', () => {
        test('should return [\'a\', \'b\'] for {a: 1, b: 2} and 0', () => {
            expect(highScoreCategories({a: 1, b: 2}, 0)).toEqual({
                found: true,
                categories: ['a', 'b'],
            });
        });

        test('should return [\'b\'] for {a: 1, b: 2} and 1', () => {
            expect(highScoreCategories({a: 1, b: 2}, 1)).toEqual({
                found: true,
                categories: ['b'],
            });
        });

        test('should return [] for {a: 1, b: 2} and 3', () => {
            expect(highScoreCategories({a: 1, b: 2}, 3)).toEqual({
                found: false,
                categories: [],
            });
        });

        test('should return [\'b\'] for {a: -1, b: 2} and 1', () => {
            expect(highScoreCategories({a: -1, b: 2}, 1)).toEqual({
                found: true,
                categories: ['b'],
            });
        });
    });

    describe('bad cases', () => {
        describe('score', () => {
            const badScores = [
                0,
                'string',
                true,
                false,
            ];

            badScores.forEach((scores) => {
                test(`should not found for ${JSON.stringify(scores)}`, () => {
                    expect(highScoreCategories(scores as any, 0)).toEqual({
                        found: false,
                        categories: [],
                    });
                });
            });
        });

        describe('threshold', () => {
            const badThresholds = [
                'string',
                true,
                false,
                {},
                [],
            ];

            badThresholds.forEach((threshold) => {
                test(`should not found for ${JSON.stringify(threshold)}`, () => {
                    expect(highScoreCategories({}, threshold as any)).toEqual({
                        found: false,
                        categories: [],
                    });
                });
            });
        });
    });
});
