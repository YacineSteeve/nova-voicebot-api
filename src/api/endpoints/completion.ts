import type { Request, Response } from 'express';
import { redirectCompletion, redirectModeration } from '../redirections';
import highScoreCategories from '../../lib/high-score-categories';

export function getCompletion(request: Request, response: Response) {
    request.accepts('text/plain');
    response.type('application/json');

    const MODERATION_THRESHOLD: number = 0.001;
    const queryParams = {
        prompt: request.query['prompt'] as string,
        user: request.query['user'] as string
    };

    if (!queryParams.prompt || queryParams.prompt === '') {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Missing `prompt` parameter to completion request.'
            });
        return
    }

    if (!queryParams.user || queryParams.user === '') {
        response
            .status(500)
            .json({
                success: false,
                error: 'SERVER ERROR: Missing `user` parameter to completion request.'
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
                    .status(400)
                    .json({
                        success: false,
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
