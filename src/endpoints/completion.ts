import type { Request, Response } from 'express';
import { redirectCompletion, redirectModeration } from '../redirections';
import highScoreCategories from '../lib/high-score-categories';

export function getCompletion(request: Request, response: Response) {
    request.accepts('application/json');
    response.type('application/json');

    const MODERATION_THRESHOLD: number = 0.001;
    const queryParams = {
        prompt: request.body.prompt,
        user: request.body.user
    };

    if (!queryParams.prompt || queryParams.prompt === '') {
        response
            .status(400)
            .json({
                success: false,
                error: 'ERROR: Missing `prompt` parameter to completion request.'
            });
        return
    }

    if (!queryParams.user || queryParams.user === '') {
        response
            .status(400)
            .json({
                success: false,
                error: 'ERROR: Missing `user` parameter to completion request.'
            });
        return
    }

    redirectModeration(queryParams.prompt)
        .then(moderationResponse => {
            const highScores = highScoreCategories(
                moderationResponse.data.results[0].category_scores,
                MODERATION_THRESHOLD
            )

            if (moderationResponse.data.results[0].flagged
                || highScores.found
            ) {
                response
                    .status(451)
                    .json({
                        success: false,
                        error: 'ERROR: Prompt is not suitable for completion.',
                        categories: highScores.categories
                    })
            } else {
                redirectCompletion(queryParams)
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
                                error: 'ERROR: Completion went wrong: '
                                    + error.response.data.error.message
                            });
                    });
            }
        })
        .catch(error => {
            response
                .status(error.response.status)
                .json({
                    success: false,
                    error: 'ERROR: Moderation went wrong: '
                        + error.response.data.error.message
                });
        });
}
