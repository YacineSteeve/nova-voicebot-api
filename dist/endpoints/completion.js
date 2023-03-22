"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompletion = void 0;
const redirections_1 = require("../redirections");
const high_score_categories_1 = __importDefault(require("../lib/high-score-categories"));
function getCompletion(request, response) {
    request.accepts('text/plain');
    response.type('application/json');
    const MODERATION_THRESHOLD = 0.001;
    const queryParams = {
        prompt: request.query['prompt'],
        user: request.query['user']
    };
    if (!queryParams.prompt || queryParams.prompt === '') {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Missing `prompt` parameter to completion request.'
        });
        return;
    }
    if (!queryParams.user || queryParams.user === '') {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Missing `user` parameter to completion request.'
        });
        return;
    }
    (0, redirections_1.redirectModeration)(queryParams.prompt)
        .then(moderationResponse => {
        const highScores = (0, high_score_categories_1.default)(moderationResponse.data.results[0].category_scores, MODERATION_THRESHOLD);
        if (moderationResponse.data.results[0].flagged
            || highScores.found) {
            response
                .status(400)
                .json({
                success: false,
                categories: highScores.categories
            });
        }
        else {
            (0, redirections_1.redirectCompletion)(queryParams)
                .then(completionResponse => {
                response.json({
                    success: true,
                    completion: completionResponse.data
                });
            })
                .catch(error => {
                response
                    .status(error.response.status)
                    .json({
                    success: false,
                    error: 'SERVER ERROR: Completion went wrong'
                });
            });
        }
    })
        .catch(error => {
        response
            .status(error.response.status)
            .json({
            success: false,
            error: 'SERVER ERROR: Moderation went wrong'
        });
    });
}
exports.getCompletion = getCompletion;
//# sourceMappingURL=completion.js.map