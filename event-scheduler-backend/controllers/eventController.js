// Created by Philip Brunet

import Event from "../models/Event.js";
import Submission from "../models/Submission.js";
import User from "../models/User.js";

const event_post = async (req, res) => {
  const { name, description, isRecurring } = req.body;
  if (isRecurring === undefined) {
    isRecurring = false;
  }
  try {
    if (!res.locals.user) {
      throw new Error("Only registered users can organize new events");
    }
    const event = await Event.create({
      name,
      description,
      isRecurring,
      userId: res.locals.user._id,
    });
    return res
      .status(201)
      .send({ message: `New event ${name} posted successfully`, event });
  } catch (err) {
    return res.status(400).send({
      message: "Error posting new event",
      error: err.message,
    });
  }
};

const event_get_by_id = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      throw new Error("Event not found");
    }
    const organizer = await User.findById(event.userId);
    if (!organizer) {
      throw new Error("Could not fetch event organizer info");
    }
    let userHasSubmitted = false;
    if (res.locals.user) {
      const submission = await Submission.findOne({
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
    return res.status(400).send({
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

const myevents_get = async (req, res) => {
  try {
    if (!res.locals.user) {
      throw new Error("Only registered users can view their events");
    }
    const eventsPerPage = 5;
    const page = req.query.p || 0;
    let filter = { userId: res.locals.user._id };
    if (req.query.before) {
      if (req.query.before.length !== 8 || isNaN(req.query.before)) {
        throw new Error(
          "Before and after queries must be formatted as YYYYMMDD"
        );
      }
      filter = {
        ...filter,
        createdAt: { $lt: queryStrToDate(req.query.before) },
      };
    }
    if (req.query.after) {
      if (req.query.after.length !== 8 || isNaN(req.query.after)) {
        throw new Error(
          "Before and after queries must be formatted as YYYYMMDD"
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
      const numEvents = await Event.countDocuments(filter);
      numPages = Math.ceil(numEvents / eventsPerPage);
      events = await Event.find(filter)
        .sort({ createdAt: -1 })
        .skip(page * eventsPerPage)
        .limit(eventsPerPage);
    }
    if (!req.query.role || req.query.role === "attendee") {
      const numEvents = await Submission.countDocuments(filter);
      numPages = Math.ceil(numEvents / eventsPerPage);
      const submissions = await Submission.find(filter)
        .sort({ createdAt: -1 })
        .skip(page * eventsPerPage)
        .limit(eventsPerPage);
      for (let i = 0; i < submissions.length; i++) {
        const submission = submissions[i];
        const event = await Event.findById(submission.eventId);
        events.push(event);
      }
    }
    return res.status(200).send({
      message: "Events fetched successfully",
      events,
      numPages,
    });
  } catch (err) {
    return res.status(400).send({
      message: "Error fetching events",
      error: err.message,
    });
  }
};

const finalize_post_by_id = async (req, res) => {
  const { finalizedTime } = req.body;
  try {
    if (!res.locals.user) {
      throw new Error("Only registered users can finalize their events");
    }
    if (!finalizedTime) {
      throw new Error(
        "Must provide a finalized time in order to finalize event."
      );
    }
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        finalizedTime,
      },
      { new: true }
    );
    if (event) {
      if (event.userId.toString() === res.locals.user.id) {
        return res
          .status(200)
          .send({ message: "Event finalized successfully", event });
      } else {
        throw new Error("Only the event host can finalize an event");
      }
    } else {
      throw new Error("Event not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      message: "Error finalizing event",
      error: err.message,
    });
  }
};

export { event_post, event_get_by_id, myevents_get, finalize_post_by_id };
