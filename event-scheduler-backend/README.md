# Event Scheduler - Node.js/Express Backend

The server-side application, which uses Node.js and Express to access the Mongo database and communicate to the client.

## Setup

In this folder, use `npm install` to install the backend dependencies.

Create two copies of `.env.sample`. Name one of them `.env` and name the other one `.env.test`.

For `.env`, set the environment variable `MONGODB_URI` to your Mongo database's URI, the environment variable `PORT` to your desired port, and `JWT_SECRET` to a string that will be difficult for attackers to guess so you can use it to sign JWTs.

For `.env.test`, do the same, but set `MONGODB_URI` to a different database's URI. This test database will be cleaned before and after running tests. 

## Running

Use `npm run test` to run tests.

Use `npm run dev` to run the server using Nodemon.

Use `npm run start` to run the server without Nodemon.
