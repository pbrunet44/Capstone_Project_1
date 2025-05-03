# Event Scheduler - Node.js/Express Backend
The server-side application, which uses Node.js and Express to access the Mongo database and communicate with the client.

## Setup
In the command line, navigate to the project's `event-scheduler-backend` directory, then run the command `npm install` to install the backend dependencies.

Create two copies of `.env.sample`. Name one of them `.env` and name the other one `.env.test`. One will be used when running the server, and the other will be used when running tests.

For `.env`, set the environment variable `MONGODB_URI` to your Mongo database's URI, the environment variable `PORT` to your desired port, and the environment variable `JWT_SECRET` to a string that will be difficult for attackers to guess so you can use it to sign JSON Web Tokens.

For `.env.test`, do the same, but set `MONGODB_URI` to a different Mongo database's URI. This test database will be cleaned before and after running tests, so make sure not to use the same database in both environments or your data will be erased. 

## Running
Once dependencies and environment variables are set up, you can run the following commands inside the `event-scheduler-backend` directory:
- Use `npm run test` to run tests.
- Use `npm run dev` to run the server using [nodemon](https://www.npmjs.com/package/nodemon). This will restart the server whenever you save a file on the backend, which is useful for development.
- Use `npm run start` to run the server without nodemon.
