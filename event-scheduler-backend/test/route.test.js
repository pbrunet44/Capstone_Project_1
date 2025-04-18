import User from "../models/User.js";
import app from "../app.js";
import * as chaiModule from "chai";
import { expect, should, use } from "chai";
import chaiHttp from "chai-http";
const chai = chaiModule.use(chaiHttp);
const agent = chai.request.agent(app);

before((done) => {
  console.log("Pre-test database cleanup");
  User.deleteMany({})
    .then(() => done())
    .catch((err) => done(err));
});

after((done) => {
  console.log("Post-test database cleanup");
  User.deleteMany({})
    .then(() => done())
    .catch((err) => done(err));
});

const testUser = {
  username: "Alan",
  email: "alan@mail.com",
  password: "TestingMochaAndChaiAbcd1234",
};
const testEvent = {
  name: "Picnic",
  description: "Join us for lunch at the park!",
  isRecurring: false,
};
const testFinalizedTime = {
  finalizedTime: "Thursday at 9:00pm",
};
const testSubmission = {
  notes: "Only free Saturdays",
  calendar: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};
const testSubmissionUpdate = {
  notes: "Only free Saturdays and Sundays",
  calendar: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

describe("Test signup and login of users", () => {
  it("should try to signup, get a 201 response code and confirmation message, and receive a JWT", (done) => {
    agent
      .post("/user")
      .send(testUser)
      .then((res) => {
        expect(res).to.have.status(201);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(
          `New user ${testUser.username} registered successfully`
        );
        expect(res).to.have.cookie("jwt");
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to login, get a 200 response code and confirmation message, and receive a JWT", (done) => {
    agent
      .post("/login")
      .send(testUser)
      .then((res) => {
        expect(res).to.have.status(200);
        const body = JSON.parse(res.text);
        expect(JSON.parse(res.text).message).to.equal(
          `User ${testUser.username} logged in successfully`
        );
        expect(res).to.have.cookie("jwt");
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to get data about logged in user, then get a 200 response code, a confirmation message, and the data", (done) => {
    agent
      .get("/user")
      .then((res) => {
        console.log(res);
        expect(res).to.have.status(200);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`User data fetched successfully`);
        expect(body.user).to.exist;
        expect(body.user.username).to.equal(testUser.username);
        expect(body.user.email).to.equal(testUser.email);
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to update the user's email address, then get a 200 response code and a confirmation message", (done) => {
    const newEmail = "alan@example.com";
    agent
      .put("/user")
      .send({ email: newEmail, oldPassword: testUser.password })
      .then((res) => {
        console.log(res);
        expect(res).to.have.status(200);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`User data updated successfully`);
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to update the user's email address with the wrong password, then get a 500 response code and an error message", (done) => {
    const newEmail = "alan@test.com";
    agent
      .put("/user")
      .send({ email: newEmail, oldPassword: "12345678" })
      .then((res) => {
        console.log(res);
        expect(res).to.have.status(500);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`Error updating user info`);
        expect(body.error).to.equal("Incorrect old password");
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to signup with the same username, then get a 400 response code and an error message.", (done) => {
    agent
      .post("/user")
      .send(testUser)
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`Error while registering new user`);
        expect(body.error).to.contain(
          `dup key: { username: "${testUser.username}" }`
        );
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to signup without a username, then get a 400 response code and an error message.", (done) => {
    agent
      .post("/user")
      .send({ email: testUser.email, password: testUser.password })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(JSON.parse(res.text).message).to.equal(
          `Error while registering new user`
        );
        expect(JSON.parse(res.text).error).to.contain(
          `user validation failed: username: Username required`
        );
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to login without a username, then get a 400 response code and an error message.", (done) => {
    agent
      .post("/login")
      .send({ email: testUser.email, password: testUser.password })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(JSON.parse(res.text).message).to.equal(
          `Error while logging in user`
        );
        expect(JSON.parse(res.text).error).to.contain(
          `Incorrect username or password`
        );
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to signup without an email, then get a 400 response code and an error message.", (done) => {
    agent
      .post("/user")
      .send({ username: testUser.username, password: testUser.password })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(JSON.parse(res.text).message).to.equal(
          `Error while registering new user`
        );
        expect(JSON.parse(res.text).error).to.contain(
          `user validation failed: email: Email required`
        );
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to signup with an invalid email, then get a 400 response code and an error message.", (done) => {
    agent
      .post("/user")
      .send({ ...testUser, email: "alanmail.com" })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`Error while registering new user`);
        expect(body.error).to.contain(
          `user validation failed: email: Invalid email address`
        );
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to signup without a password, then get a 400 response code and an error message.", (done) => {
    agent
      .post("/user")
      .send({ username: testUser.username, email: testUser.email })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`Error while registering new user`);
        expect(body.error).to.contain(`Password required`);
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to login without a password, then get a 400 response code and an error message.", (done) => {
    agent
      .post("/login")
      .send({ username: testUser.username, email: testUser.email })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`Error while logging in user`);
        expect(body.error).to.contain(`Password required`);
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to signup with a short password, then get a 400 response code and an error message.", (done) => {
    agent
      .post("/user")
      .send({ ...testUser, password: "123" })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`Error while registering new user`);
        expect(body.error).to.contain(
          `Passwords must be at least 8 characters long`
        );
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should try to login with a the wrong password, then get a 400 response code and an error message.", (done) => {
    agent
      .post("/login")
      .send({ ...testUser, password: "12345678" })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`Error while logging in user`);
        expect(body.error).to.contain(`Incorrect username or password`);
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
});

let eventId = null;
describe("Test creation of events", () => {
  it("should try to create a new event, then get a 201 response code and confirmation message", (done) => {
    agent
      .post("/event")
      .send(testEvent)
      .then((res) => {
        expect(res).to.have.status(201);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(
          `New event ${testEvent.name} posted successfully`
        );
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });

  it("should query for a list of the user's organized events, then get a 200 response code and the data", (done) => {
    agent
      .get("/myevents?role=organizer")
      .then((res) => {
        expect(res).to.have.status(200);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`Events fetched successfully`);
        expect(body.events).to.exist;
        expect(body.events.length).to.not.equal(0);
        eventId = body.events[0]._id;
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should query for a specific event by ID, then get a 200 response code and the data", (done) => {
    agent
      .get(`/event/${eventId}`)
      .then((res) => {
        expect(res).to.have.status(200);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`Event fetched successfully`);
        expect(body.event).to.exist;
        expect(body.event.name).to.equal(testEvent.name);
        expect(body.event.description).to.equal(testEvent.description);
        expect(body.event.isRecurring).to.equal(testEvent.isRecurring);
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should post the finalized event time for a specific event, then get a 200 response code and a confirmation message.", (done) => {
    agent
      .post(`/finalize/${eventId}`)
      .send(testFinalizedTime)
      .then((res) => {
        expect(res).to.have.status(200);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal("Event finalized successfully");
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("should confirm the event has been updated to include the finalized time", (done) => {
    agent
      .get(`/event/${eventId}`)
      .then((res) => {
        expect(res).to.have.status(200);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(`Event fetched successfully`);
        expect(body.event).to.exist;
        expect(body.event.name).to.equal(testEvent.name);
        expect(body.event.description).to.equal(testEvent.description);
        expect(body.event.isRecurring).to.equal(testEvent.isRecurring);
        expect(body.event.finalizedTime).to.equal(
          testFinalizedTime.finalizedTime
        );
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
});

describe("Test submission of availability", () => {
  it("submits availability without a calendar, then gets a 400 response code and an error message", (done) => {
    agent
      .post(`/submit/${eventId}`)
      .send({ notes: testSubmission.notes })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(
          "Error submitting availability for event"
        );
        expect(body.error).to.equal("Submission must include calendar");
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("submits availability with an improperly formatted calendar, then gets a 400 response code and an error message", (done) => {
    agent
      .post(`/submit/${eventId}`)
      .send({
        notes: testSubmission.notes,
        calendar: [
          [0, 0, 0],
          [0, 0, 0],
        ],
      })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(
          "Error submitting availability for event"
        );
        expect(body.error).to.equal("Calendar must be a 7 by 24 grid");
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("submits properly formatted availability, then gets a 201 response code and a confirmation message", (done) => {
    agent
      .post(`/submit/${eventId}`)
      .send(testSubmission)
      .then((res) => {
        expect(res).to.have.status(201);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(
          `Submitted availability for event ${testEvent.name} successfully`
        );
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("submits an availability update without a calendar, then gets a 400 response code and an error message", (done) => {
    agent
      .put(`/submit/${eventId}`)
      .send({ notes: testSubmissionUpdate.notes })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal("Error updating availability for event");
        expect(body.error).to.equal("Submission must include calendar");
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("submits an availability update with an improperly formatted calendar, then gets a 400 response code and an error message", (done) => {
    agent
      .put(`/submit/${eventId}`)
      .send({
        notes: testSubmissionUpdate.notes,
        calendar: [
          [0, 0, 0],
          [0, 0, 0],
        ],
      })
      .then((res) => {
        expect(res).to.have.status(400);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal("Error updating availability for event");
        expect(body.error).to.equal("Calendar must be a 7 by 24 grid");
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
  it("submits a properly formatted availability update, then gets a 200 response code and a confirmation message", (done) => {
    agent
      .put(`/submit/${eventId}`)
      .send(testSubmissionUpdate)
      .then((res) => {
        expect(res).to.have.status(200);
        const body = JSON.parse(res.text);
        expect(body.message).to.equal(
          `Updated availability for event ${testEvent.name} successfully`
        );
        done();
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  });
});
