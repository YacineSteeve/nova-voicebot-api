import type { SentMessageInfo } from 'nodemailer';
import type { CreateCompletionResponse } from 'openai';

export interface UserResponse {
    username: string;
    email: string;
}

export type CompletionResponse = CreateCompletionResponse;

export type SpeechResponse = string;

export interface ServiceResponseData {
    success: boolean;
    error?: string;
    fields?: string[];
    categories?: string[];
    user?: UserResponse;
    token?: string;
    completion?: CompletionResponse;
    speech?: SpeechResponse;
    message?: string;
    info?: SentMessageInfo;
}

export interface ServiceResponse {
    status: number;
    data: ServiceResponseData;
}
