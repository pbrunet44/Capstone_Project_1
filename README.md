# Event Scheduling Web App
MERN Stack Capstone Project for Springboard Software Engineering Course.

The Event Scheduler allows users to plan events with their friends, family, and colleagues by weighing how available attendees are at different times, such as what times they are most free, or what times would be inconvenient, and creating a heatmap based on their responses. 

Users must create an account to post events. Users can conveniently copy the event link and send it to other attendees, who are able to respond without creating an account. 

Attendees can provide a name and some notes about their availability, and they can choose to provide an email if they would like to be contacted by the organizer when the event time is decided.

Once there are enough attendees submitted, the organizer can finalize an event, selecting a date and time that works best based on the attendee responses. They can then send an email to attendees about the finalized time.

Users who make an account can view which events they've responded to and which events they've organized. They can also view their profile to see which day they registered their account, or to change their username, email, or password.

User authentication is handled with JSON Web Tokens and the Authorization header. My original plan was to use JWTs over cookies, but I ran into errors in production.

# Running the Project
There are two project directories, one for the frontend and one for the backend. The frontend is built with React, and the backend is built with Node.js/Express.

To run locally, it will be helpful to use a separate terminal window for the frontend and the backend. Once both are running, you will be able to access the frontend in your web browser.

Before running, be sure to have [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/package/npm) installed.

## React Frontend
The client-side application, which communicates with the server and uses React to interact with the user and display data.

### Setup
In the command line, navigate to the project's `event-scheduler-frontend` directory, then run the command `npm install` to install the frontend dependencies.

Create a copy of `.env.sample` and name it `.env`. Set the environment variable `VITE_SERVER_URL` to the URL where you are hosting the backend. If you are running locally, and the backend is using port 3000, the server URL would be `http://localhost:3000`.

### Running
Once dependencies and environment variables are set up, you can run the following commands inside the `event-scheduler-frontend` directory:
- Use `npm run test` to run tests.
- Use `npm run dev` to run the client locally. You will be provided a URL that you can use to access the frontend in your browser.
- Use `npm run build` to prepare the client for production. The built frontend outputs to the `dist` directory.

## Node.js/Express Backend
The server-side application, which uses Node.js and Express to access the Mongo database and communicate with the client.

### Setup
In the command line, navigate to the project's `event-scheduler-backend` directory, then run the command `npm install` to install the backend dependencies.

Create two copies of `.env.sample`. Name one of them `.env` and name the other one `.env.test`. One will be used when running the server, and the other will be used when running tests.

For `.env`, set the environment variable `MONGODB_URI` to your Mongo database's URI, the environment variable `PORT` to your desired port, and the environment variable `JWT_SECRET` to a string that will be difficult for attackers to guess so you can use it to sign JSON Web Tokens.

For `.env.test`, do the same, but set `MONGODB_URI` to a different Mongo database's URI. This test database will be cleaned before and after running tests, so make sure not to use the same database in both environments or your data will be erased. 

### Running
Once dependencies and environment variables are set up, you can run the following commands inside the `event-scheduler-backend` directory:
- Use `npm run test` to run tests.
- Use `npm run dev` to run the server using [nodemon](https://www.npmjs.com/package/nodemon). This will restart the server whenever you save a file on the backend, which is useful for development.
- Use `npm run start` to run the server without nodemon.

## Mongo Database
The database, which stores data about users, event listings, and event availability long-term.

### Setup
You will need two Mongo databases: one for running the project, and one for backend testing. You could use two databases on one cluster. 

My deployed project hosts the databases using [MongoDB Atlas](https://www.mongodb.com/atlas). 

Both databases should have three collections:
- events
- submissions
- users

Make sure to provide the [MongoDB connection URI](https://www.mongodb.com/docs/manual/reference/connection-string/) for the main database in the backend's `.env` file, and provide the URI for the test database in the backend's `.env.test` file.

# Project Planning
The planning phase for this project was broken into preliminary steps, shared below.

## Step 1: Project Ideas
My mentor and I narrowed this project down to two ideas, one of which has a possible extension.
### Scheduling App
A website that people can use to coordinate schedules for meetups, business meetings, study sessions, or other events.
The event organizer could create a link to share with attendees. After they reply, the organizer can see a visualization of which times work best.
The organizer can either plan for a weekly event, or an event that happens once on a specific week.
The attendees would click on the link and enter their availability on a 1 week calendar broken up into 15 minute intervals. 
There would be 5 "brushes" they could use to mark their availability: 
- completely free
- might be free (contingent on things like boss approving time off or how late another event might start)
- minor inconvenience (could come, but not ideal)
- major inconvenience (could come, but have to make some compromises)
- can't come no matter what

The attendees could also leave comments explaining a particular availability slot if they like.
The app will weigh the number of people available for a certain time, and the type of availability, to create a heat map of best days and times.

### Quiz/Studying App
A website where users can submit quizzes and flashcards that they can use to study, and share those quizzes and flashcards with other users.
Users will be able to search for different flashcards and quizzes by subject.
Users will be able to import and export quizzes and flashcards as JSON files so they can backup their data. This ensures they have access to their study materials if they are not able to access the site.
Users will be able to create accounts to save and favorite quizzes and flashcards made by other users.

#### Quiz/Studying App Extension: Decenteralization
The app could support selecting which server/"access node" they will use to upload and download content. 
Users could clone the repository to create their own access node and self-host their content. Optionally, users could make their access node password protected.
Organizations such as universities could use this feature to host their studying resources on their own servers.

## Step 2: Scheduling App Project Proposal
https://docs.google.com/document/d/1q-CadYHmvv3TuqabF--hJLfh68qeNMCg0lwYI3rP6Vk/edit?usp=sharing

## Step 3: Plan Frontend Specifications
Included in the project proposal under `User Flows`.

## Step 4: Plan Database Model
Included in the project proposal under `Database Schema`.

The original plan was to use PostgreSQL, but I later decided to use MongoDB.

## Step 5: Plan API Specifications
https://docs.google.com/document/d/13Z-xxMv24JOjl8yaXxBQItfe7NgALum8hRKlc2zI9Ok/edit?usp=sharing
