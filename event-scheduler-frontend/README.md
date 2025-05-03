# Event Scheduler - React Frontend
The client-side application, which communicates with the server and uses React to interact with the user and display data.

## Setup
In the command line, navigate to the project's `event-scheduler-frontend` directory, then run the command `npm install` to install the frontend dependencies.

Create a copy of `.env.sample` and name it `.env`. Set the environment variable `VITE_SERVER_URL` to the URL where you are hosting the backend. If you are running locally, and the backend is using port 3000, the server URL would be `http://localhost:3000`.

## Running
Once dependencies and environment variables are set up, you can run the following commands inside the `event-scheduler-frontend` directory:
- Use `npm run test` to run tests.
- Use `npm run dev` to run the client locally. You will be provided a URL that you can use to access the frontend in your browser.
- Use `npm run build` to prepare the client for production. The built frontend outputs to the `dist` directory.
