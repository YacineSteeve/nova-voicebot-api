"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpeech = void 0;
const redirections_1 = require("../redirections");
function getSpeech(request, response) {
    request.accepts('text/plain');
    response.type('application/json');
    const queryParams = {
        text: request.query['text'],
        lang: request.query['lang']
    };
    if (!queryParams.text || queryParams.text === '') {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Missing `text` parameter to speech request.'
        });
        return;
    }
    if (!queryParams.lang || queryParams.lang === '') {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Missing `lang` parameter to speech request.'
        });
        return;
    }
    (0, redirections_1.redirectSpeech)(queryParams)
        .then(speechResponse => {
        response.json({
            success: true,
            speech: speechResponse.data
        });
    })
        .catch(error => {
        response
            .status(error.response.status)
            .json({
            success: false,
            error: `${error.response.statusText.toUpperCase()}: ` +
                `Invalid language '${JSON.parse(error.response.config.data).lang}'`
        });
    });
}
exports.getSpeech = getSpeech;
//# sourceMappingURL=speech.js.map