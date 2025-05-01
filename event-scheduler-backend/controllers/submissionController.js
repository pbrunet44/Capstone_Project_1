// Created by Philip Brunet

import QueryError from "../queryError.js";
import AuthService from "../services/authService.js";
import EventService from "../services/eventService.js";
import SubmissionService from "../services/submissionService.js";

const submitPostById = async (req, res) => {
  const { name, email, notes, calendar, useAccountData } = req.body;
  try {
    if (email) {
      AuthService.verifyEmail(email);
    }
    const event = await EventService.getEventById(req.params.id);
    if (!event) {
      throw new QueryError("Event not found", 404);
    }
    if (res.locals.user) {
      SubmissionService.createSubmission({
        userId: res.locals.user._id,
        name: useAccountData ? res.locals.user.username : name,
        email: useAccountData ? res.locals.user.email : email,
        eventId: event._id,
        calendar,
        notes,
      });
      return res.status(201).send({
        message: `Submitted availability for event ${event.name} successfully`,
      });
    } else {
      if (email) {
        const prevSubmission = await SubmissionService.getSubmission({
          email: email,
          eventId: event._id,
        });
        if (prevSubmission) {
          throw new QueryError(
            "Availability already submitted using that email",
            400
          );
        }
      }
      SubmissionService.createSubmission({
        name,
        email,
        eventId: event._id,
        calendar,
        notes,
      });
      return res.status(201).send({
        message: `Submitted availability for event ${event.name} successfully`,
      });
    }
  } catch (err) {
    return res.status(err.status ? err.status : 500).send({
      message: "Error submitting availability for event",
      error: err.message,
    });
  }
};

const submitPutById = async (req, res) => {
  const { name, email, notes, calendar } = req.body;
  try {
    if (email) {
      AuthService.verifyEmail(email);
    }
    const event = await EventService.getEventById(req.params.id);
    if (!event) {
      throw new QueryError("Event not found", 404);
    }
    const submission = await SubmissionService.updateSubmission(
      {
        userId: res.locals.user._id,
        eventId: req.params.id,
      },
      {
        notes,
        calendar,
        name: name ? name : res.locals.user.username,
        email: email ? email : res.locals.user.email,
      }
    );
    if (!submission) {
      throw new QueryError("Submission for event with that ID not found", 404);
    }
    return res.status(200).send({
      message: `Updated availability for event ${event.name} successfully`,
    });
  } catch (err) {
    return res.status(err.status ? err.status : 500).send({
      message: "Error updating availability for event",
      error: err.message,
    });
  }
};

const submissionsGetById = async (req, res) => {
  try {
    let isOrganizer = false;
    if (res.locals.user) {
      const event = await EventService.getEventById(req.params.id);
      if (res.locals.user.id === event.userId.toString()) {
        isOrganizer = true;
      }
    }
    let submissions = [];
    if (!isOrganizer) {
      submissions = await SubmissionService.getFieldsFromSubmissions(
        {
          eventId: req.params.id,
        },
        "calendar"
      );
    } else {
      submissions = await SubmissionService.getSubmissions({
        eventId: req.params.id,
      });
    }
    return res
      .status(200)
      .send({ message: "Submissions fetched successfully", submissions });
  } catch (err) {
    return res.status(err.status ? err.status : 500).send({
      message: "Error fetching submissions for event",
      error: err.message,
    });
  }
};

export { submitPostById, submitPutById, submissionsGetById };
