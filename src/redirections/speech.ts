import axios from 'axios';
import type { AxiosResponse } from 'axios';
import * as process from 'process';

interface SpeechRequestData {
    text: string;
    lang?: string;
    speed?: string;
    codec?: string;
    format?: string;
    b64?: string;
}

export async function redirectSpeech(data: SpeechRequestData): Promise<AxiosResponse> {
    return await axios.request({
        method: 'GET',
        url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
        params: {
            key: process.env.VOICERSS_API_KEY,
            src: data.text,
            hl: data.lang || 'en-us',
            r: data.speed || '0',
            c: data.codec || 'mp3',
            f: data.format || '8khz_8bit_mono',
            b64: data.b64 || true,
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_API_KEY,
            'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
        },
    });
}
