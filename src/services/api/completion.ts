import { redirectCompletion, redirectModeration } from './redirections';
import type { CompletionRequestData } from './redirections/completion';
import type { ServiceResponse, CompletionResponse } from '../../types';
import cache from '../../cache';
import highScoreCategories from '../../utils/high-score-categories';

export async function completion(data: CompletionRequestData, cacheSignature?: string): Promise<ServiceResponse> {
    const MODERATION_THRESHOLD: number = 0.001;
    const { prompt, user } = data;

    if (!prompt || prompt === '') {
        return {
            status: 400,
            data: {
                success: false,
                error: 'ERROR: Missing `prompt` parameter to completion request.'
            }
        };
    }

    if (!user || user === '') {
        return {
            status: 400,
            data: {
                success: false,
                error: 'ERROR: Missing `user` parameter to completion request.'
            }
        };
    }

    const cachedCompletion = cache.get<CompletionResponse>(
        prompt + (cacheSignature || '')
    );

    if (cachedCompletion) {
        return {
            status: 200,
            data: {
                success: true,
                completion: cachedCompletion
            }
        };
    }

    try {
        const moderationResponse = await redirectModeration(prompt);

        const highScores = highScoreCategories(
            moderationResponse.data.results[0].category_scores,
            MODERATION_THRESHOLD
        );

        if (
            moderationResponse.data.results[0].flagged
            || highScores.found
        ) {
            return {
                status: 451,
                data: {
                    success: false,
                    error: 'ERROR: Prompt is not suitable for completion.',
                    categories: highScores.categories
                }
            };
        }

        const completionResponse = await redirectCompletion(data);

        cache.set(
            prompt + (cacheSignature || ''),
            completionResponse.data,
        );

        return {
            status: 200,
            data: {
                success: true,
                completion: completionResponse.data
            }
        };
    } catch (error) {
        return {
            status: error.response.status,
            data: {
                success: false,
                error: 'ERROR: Completion went wrong: '
                    + error.response.data.error.message
            }
        };
    }
}
