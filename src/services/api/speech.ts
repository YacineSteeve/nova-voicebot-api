import { redirectSpeech } from './redirections';
import type { SpeechRequestData } from './redirections/speech';
import type { ServiceResponse, SpeechResponse } from '../../types';
import cache from '../../cache';

export async function speech(data: SpeechRequestData, cacheSignature?: string): Promise<ServiceResponse> {
    const { text } = data;

    if (!text || text === '') {
        return {
            status: 400,
            data: {
                success: false,
                error: 'ERROR: Missing `text` parameter to speech request.'
            }
        };
    }

    const cachedSpeech = cache.get<SpeechResponse>(
        JSON.stringify(data) + (cacheSignature || '')
    );

    if (cachedSpeech) {
        return {
            status: 200,
            data: {
                success: true,
                speech: cachedSpeech
            }
        };
    }

    try {
        const speechResponse = await redirectSpeech(data);

        if (speechResponse.data.includes('ERROR: ')) {
            return {
                status: 500,
                data: {
                    success: false,
                    error: speechResponse.data
                }
            };
        }

        cache.set(
            JSON.stringify(data) + (cacheSignature || ''),
            speechResponse.data
        );

        return {
            status: 200,
            data: {
                success: true,
                speech: speechResponse.data
            }
        };
    } catch (error) {
        return {
            status: 500,
            data: {
                success: false,
                error: 'ERROR: ' + error
            }
        };
    }
}
