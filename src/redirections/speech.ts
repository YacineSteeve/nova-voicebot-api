import axios from 'axios';
import type { AxiosResponse } from 'axios';
import * as process from 'process';

interface SpeechRequestData {
    text: string;
    lang: string;
}

export async function redirectSpeech(data: SpeechRequestData): Promise<AxiosResponse> {
    return await axios.request({
        url: 'https://text-to-speech53.p.rapidapi.com/',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'text-to-speech53.p.rapidapi.com'
        },
        data: JSON.stringify({
            text: data.text,
            lang: data.lang,
            format: 'mp3'
        })
    });
}
