"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function highScoreCategories(scores, threshold) {
    const highs = Object.keys(scores)
        .filter((category) => scores[category] > threshold);
    return {
        found: highs.length > 0,
        categories: highs
    };
}
exports.default = highScoreCategories;
//# sourceMappingURL=high-score-categories.js.map