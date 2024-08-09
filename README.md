# Backend project using IOC, singleton and repository patterns

💫 Welcome! 🎉

This backend project involves building a Node.js/TypeScript/Express/Mocha app that will serve a REST API football statistics

## Data Models

> **All models are defined in src/db/models folder


## Getting Set Up

Start by cloning the public repo

❗️ **All changes were commited to the master branch**

### Docker approach

1. Run `docker compose up --build` command to start the application

### Local approach
The exercise requires [Node.js](https://nodejs.org/en/) to be installed (the task use the version 20.15 or higher), mysql engine and redis.

1. Create an `.env` file based on `.env.sample` and customize it as you prefer. 

2. In the repo root directory, run `npm install` to gather all dependencies.

3. Next, run `npm run tsoa:full` to generate all the routes and docs.

4. Then `npm run start:dev` to start the app. In the url `localhost:3000/api-docs`, you will find the swagger interface to start checking the stats endpoint. The endpoint is protected by api key, the dummy value to allow the request is `abc123456`

## Tests
Run `npm run test` to run the tests 


## Implemented API

**_GET_** `/v1/stats/:period` - Returns a list of stats based on the period url param:

- If period is set to `week`, it will require the `weekId` to send back those stats. 
- If period is set to `month`, it will require the `monthId`.
- And, if period is set to `season`, it will send back all the season stats. 


**Note:** To speed up api response times, a cache solution using redis was implemented.