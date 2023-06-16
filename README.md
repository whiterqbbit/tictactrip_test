# Justife For All - Text Justifier API

Welcome to Justife For All, the one and only API for justifying all your text. This is a Node.js API utilizing Express and Prisma. It allows you to send plain text and return it fully justified according to your settings.

## API Endpoints

The base URL for all API endpoints is `http://tictactrip.whiterqbbit.io/`.

1. **Root Endpoint** (`/`): 

    A `GET` request to this endpoint returns a nice emoji. Not much about it.

2. **Justify Endpoint** (`/justify`): 

    This endpoint accepts a `POST` request with a body of ContentType `text/plain` and returns justified text.
    Detailed documentation for this endpoint is available [here](http://tictactrip.whiterqbbit.io/api-docs/#/default/post_justify).

3. **Token Endpoint** (`/token`): 

    A `POST` request with a JSON body containing an email field to this endpoint will return a token.
    Detailed documentation for this endpoint is available [here](http://tictactrip.whiterqbbit.io/api-docs/#/default/post_token).

## Installation

To set up and run this project locally, follow the below steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/whiterqbbit/tictactrip_test
    ```

2. Fill in the environment variables in `.env` file:

    ```bash
    JWT_SECRET=your_secret
    DATABASE_URL=your_database_url
    ```


3. Use Docker to run the project:

    ```bash
    docker-compose up
    ```

4. Setup your pre-commit hook if needed in .git/hooks/pre-commit:

    ```bash
    #!/bin/sh
    export PATH="path/to/pnpm:$PATH"
    export PATH="path/to/node:$PATH"
    pnpm pre-commit
    ```
