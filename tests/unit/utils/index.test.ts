import { highScoreCategories } from '@utils/index';

describe('src/utils/index', () => {
    test('highScoreCategories should be exported', () => {
        expect(highScoreCategories).toBeTruthy();
    });
});
