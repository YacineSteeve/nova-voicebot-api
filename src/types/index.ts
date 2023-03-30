import type { SentMessageInfo } from 'nodemailer';

export interface UserResponse {
    username: string;
    email: string;
}

export interface ServiceResponseData {
    success: boolean;
    error?: string;
    fields?: string[];
    categories?: string[];
    user?: UserResponse;
    token?: string;
    completion?: object;
    speech?: string;
    message?: string;
    info?: SentMessageInfo;
}

export interface ServiceResponse {
    status: number;
    data: ServiceResponseData;
}
