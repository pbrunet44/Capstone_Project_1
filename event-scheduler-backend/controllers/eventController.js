// Created by Philip Brunet

import AuthError from "../authError.js";
import QueryError from "../queryError.js";
import AuthService from "../services/authService.js";
import EventService from "../services/eventService.js";
import SubmissionService from "../services/submissionService.js";

const eventPost = async (req, res) => {
  const { name, description, isRecurring } = req.body;
  if (isRecurring === undefined) {
    isRecurring = false;
  }
  try {
    const event = await EventService.createEvent({
      name,
      description,
      isRecurring,
      userId: res.locals.user._id,
    });
    return res
      .status(201)
      .send({ message: `New event ${name} posted successfully`, event });
  } catch (err) {
    return res.status(err.status ? err.status : 500).send({
      message: "Error posting new event",
      error: err.message,
    });
  }
};

const eventGetById = async (req, res) => {
  try {
    const event = await EventService.getEventById(req.params.id);
    if (!event) {
      throw new QueryError("Event not found", 404);
    }
    const organizer = await AuthService.getUserById(event.userId);
    if (!organizer) {
      throw new AuthError("Could not fetch event organizer info", 404);
    }
    let userHasSubmitted = false;
    if (res.locals.user) {
      const submission = await SubmissionService.getSubmission({
        userId: res.locals.user._id,
        eventId: event._id,
      });
      if (submission) {
        userHasSubmitted = true;
      }
    }
    return res.status(200).send({
      message: "Event fetched successfully",
      event,
      organizerName: organizer.username,
      userIsOrganizer:
        res.locals.user !== null &&
        res.locals.user.id === event.userId.toString(),
      userHasSubmitted,
    });
  } catch (err) {
    return res.status(err.status ? err.status : 500).send({
      message: "Error fetching event info",
      error: err.message,
    });
  }
};

/*
 * Converts a string in the format YYYYMMDD into a date object
 */
const queryStrToDate = (query) => {
  const year = query.slice(0, 4);
  const month = query.slice(4, 6);
  const day = query.slice(6, 8);
  const dateStr = `${year}-${month}-${day}`;
  return new Date(dateStr);
};

const myeventsGet = async (req, res) => {
  try {
    const eventsPerPage = 5;
    const page = req.query.p || 0;
    let filter = { userId: res.locals.user._id };
    if (req.query.before) {
      if (req.query.before.length !== 8 || isNaN(req.query.before)) {
        throw new QueryError(
          "Before and after queries must be formatted as YYYYMMDD",
          400
        );
      }
      filter = {
        ...filter,
        createdAt: { $lt: queryStrToDate(req.query.before) },
      };
    }
    if (req.query.after) {
      if (req.query.after.length !== 8 || isNaN(req.query.after)) {
        throw new QueryError(
          "Before and after queries must be formatted as YYYYMMDD",
          400
        );
      }
      filter = {
        ...filter,
        createdAt: {
          ...filter.createdAt,
          $gt: queryStrToDate(req.query.after),
        },
      };
    }
    let events = [];
    let numPages = 1;
    if (req.query.role === "organizer") {
      const numEvents = await EventService.countEvents(filter);
      numPages = Math.ceil(numEvents / eventsPerPage);
      events = await EventService.getEventsPaginated(
        filter,
        { createdAt: -1 },
        page,
        eventsPerPage
      );
    }
    if (!req.query.role || req.query.role === "attendee") {
      const numEvents = await SubmissionService.countSubmissions(filter);
      numPages = Math.ceil(numEvents / eventsPerPage);
      const submissions = await SubmissionService.getSubmissionsPaginated(
        filter,
        { createdAt: -1 },
        page,
        eventsPerPage
      );
      for (let i = 0; i < submissions.length; i++) {
        const submission = submissions[i];
        const event = await EventService.getEventById(submission.eventId);
        events.push(event);
      }
    }
    return res.status(200).send({
      message: "Events fetched successfully",
      events,
      numPages,
    });
  } catch (err) {
    return res.status(err.status ? err.status : 500).send({
      message: "Error fetching events",
      error: err.message,
    });
  }
};

const finalizePostById = async (req, res) => {
  const { finalizedTime } = req.body;
  try {
    if (!finalizedTime) {
      throw new QueryError(
        "Must provide a finalized time in order to finalize event.",
        400
      );
    }
    const event = await EventService.updateEventById(
      req.params.id,
      { finalizedTime },
      { new: true }
    );
    if (event) {
      if (event.userId.toString() === res.locals.user.id) {
        return res
          .status(200)
          .send({ message: "Event finalized successfully", event });
      } else {
        throw new AuthError("Only the event host can finalize an event", 403);
      }
    } else {
      throw new QueryError("Event not found", 404);
    }
  } catch (err) {
    console.error(err);
    return res.status(err.status ? err.status : 500).send({
      message: "Error finalizing event",
      error: err.message,
    });
  }
};

export { eventPost, eventGetById, myeventsGet, finalizePostById };
