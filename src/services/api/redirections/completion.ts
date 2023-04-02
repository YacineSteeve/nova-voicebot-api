import { Configuration, OpenAIApi } from 'openai';
import type { AxiosResponse } from 'axios';
import * as process from 'process';

const openaiConfiguration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfiguration);

export interface CompletionRequestData {
    prompt: string;
    user: string;
}

export async function redirectCompletion(
    data: CompletionRequestData,
): Promise<AxiosResponse<CompletionResponse>> {
    return await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: data.prompt,
        temperature: 0.5,
        max_tokens: 150,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        user: data.user,
    });
}

export async function redirectModeration(input: string): Promise<AxiosResponse> {
    return openai.createModeration({
        input: input,
    });
}
