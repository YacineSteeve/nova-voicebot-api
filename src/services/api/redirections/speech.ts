import axios from 'axios';
import type { AxiosResponse } from 'axios';
import * as process from 'process';
import { SpeechResponse } from '../../../types';

export interface SpeechRequestData {
    text: string;
    lang?: string;
    speed?: string;
    codec?: string;
    format?: string;
    b64?: string;
}

export async function redirectSpeech(data: SpeechRequestData): Promise<AxiosResponse<SpeechResponse>> {
    return await axios.request({
        method: 'GET',
        url: 'https://api.voicerss.org/',
        params: {
            key: process.env.VOICERSS_API_KEY,
            src: data.text,
            hl: data.lang || 'en-us',
            r: data.speed || '0',
            c: data.codec || 'mp3',
            f: data.format || '8khz_8bit_mono',
            b64: data.b64 || true,
        },
    });
}
