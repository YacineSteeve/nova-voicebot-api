# NOVA API

This is an Express API that provides various endpoints to access the NOVA platform. 

## Usage

The API is hosted on Heroku. So you can use it without having to install it locally.

#### Base URL: [https://api-nova-voicebot.herokuapp.com](https://api-nova-voicebot.herokuapp.com)

Here's a list of all the available endpoints:

### Welcome

* #### GET /

This endpoint returns a welcome message to confirm that the API is up and running.

##### Request
```curl  
GET /    
```

##### Response
```
Welcome to the NOVA API!
```

### Completion

* #### POST /api/completion
This endpoint takes in a request body containing a text prompt and returns the completion of that prompt using the OpenAI's GPT-3 model.

##### Request
```bash
POST /api/completion
Content-Type: application/json
Authorization: Bearer <token>

{
    "prompt": string;
    "user": string;
}
```

##### Response
```bash
Accept: application/json

{
    "success": true;
    "completion": {
        "id": string;
        "object": "text_completion",
        "created": number;
        "model": "text-davinci-003",
        "choices": [
            {
              "text": string; # The actual completion
              "index": 0,
              "logprobs": null,
              "finish_reason": string;
            }
        ],
        "usage": {
            "prompt_tokens": number;
            "completion_tokens": number;
            "total_tokens": number;
        }
    }
}
```

### Speech

* #### POST /api/speech
This endpoint takes in a request body containing a text input and returns the speech synthesis of that text.

##### Request
```bash
POST /api/speech
Content-Type: application/json
Authorization: Bearer <token>

{
    "text": string;
    "lang"?: string;   # Default: "en-US"
    "speed"?: string;  # Default: "0"
    "codec"?: string;  # Default: "mp3"
    "format"?: string; # Default: "8khz_8bit_mono"
    "b64"?: string;    # Default: "true"
}
```

##### Response
```bash
Accept: application/json

{
    "success": true;
    "speech": string; # "Base64-encoded audio"
}
```

### User

* #### POST /user/signup
This endpoint creates a new user account.

##### Request
```bash
POST /user/signup
Content-Type: application/json

{
    "email": string;
    "password": string;
}
```

##### Response
```bash
Accept: application/json

{
    "success": true;
    "user": {
        "username": string;
        "email": string;
    }
}
```

* #### POST /user/login
This endpoint logs in an existing user.

##### Request
```bash
POST /user/login
Content-Type: application/json

{
    "email": string;
    "password": string;
}
````

##### Response
```bash
Accept: application/json

{
    "success": true;
    "token": string; # User token, expires in 1 day
}
```

* #### POST /user/userinfo
This endpoint returns user information based on the token provided in the request.

##### Request
```bash
POST /user/userinfo
Content-Type: application/json

{
    "token": string; # User token
}
```

##### Response
```bash
Accept: application/json

{
    "success": true;
    "user": {
        "username": string;
        "email": string;
    }
}
```

* #### POST /user/delete
This endpoint deletes a user account based on the token provided in the request.

##### Request
```bash
POST /user/delete
Content-Type: application/json

{
    "token": string;
}
```

##### Response
```bash
Accept: application/json

{
    "success": true;
}
```

### Support

* #### POST /support/contact
This endpoint sends an email to the NOVA support team.

##### Request
```bash
POST /support/contact
Content-Type: application/json

{
    "name": string;
    "email": string;
    "subject": string;
    "message": string;
}
```

##### Response
```bash
Accept: application/json

{
    "success": true;
    "message": "Message sent successfully";
    "info": SMTPTransport.SentMessageInfo; # See https://nodemailer.com/message/
}
```

### Errors

All errors are returned in the following format:

```bash
Status: <status code>

{
    "success": false;
    "error": string;
    "fields"?: string[];
    "categories"?: string[]; # Only for /api/completion, when the prompt is against OpenAI's guidelines
}
```

## Installation

### Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
* [MongoDB](https://docs.mongodb.com/manual/installation/)
* [OpenAI API key](https://platform.openai.com/docs/api-reference/introduction)
* [VoiceRSS API key](https://www.voicerss.org/api/)
* [Gmail account](https://support.google.com/mail/answer/56256?hl=en)

### Setup

1. Clone the repository

```bash
git clone https://github.com/YacineSteeve/nova-voicebot-api.git
```

2. Install dependencies

```bash
yarn install
```

3. Add environment variables:

* Create a `.env` file in the root directory
* add the environment variables listed in the [.env.example](https://github.com/YacineSteeve/nova-voicebot-api/blob/main/.env.example) file.

> Note: `NODE_ENV` should be set to `development`.

4. Start the server

```bash
yarn dev
```

## License

[MIT](https://github.com/YacineSteeve/nova-voicebot-api/blob/main/LICENSE)

## Author

[Yacine BOUKARI](https://github.com/YacineSteeve)
