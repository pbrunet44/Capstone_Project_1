// Created by Philip Brunet

import Event from "../models/Event.js";
import Submission from "../models/Submission.js";

const submit_post_by_id = async (req, res) => {
  const { name, email, notes, calendar, useAccountData } = req.body;
  try {
    if (!calendar) {
      throw new Error("Submission must include calendar");
    }
    if (calendar.length !== 7) {
      throw new Error("Calendar must be a 7 by 24 grid");
    }
    for (let i = 0; i < 7; i++) {
      if (calendar[i].length !== 24) {
        throw new Error("Calendar must be a 7 by 24 grid");
      }
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      throw new Error("Event not found");
    }
    if (res.locals.user) {
      Submission.create({
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
        const prevSubmission = await Submission.findOne({ email: email });
        if (prevSubmission) {
          throw new Error("Availability already submitted using that email");
        }
      }
      Submission.create({
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
    return res.status(400).send({
      message: "Error submitting availability for event",
      error: err.message,
    });
  }
};

const submit_put_by_id = async (req, res) => {
  const { name, email, notes, calendar } = req.body;
  try {
    if (!res.locals.user) {
      throw new Error(
        "Only authenticated users can edit their event availability"
      );
    }
    if (!calendar) {
      throw new Error("Submission must include calendar");
    }
    if (calendar.length !== 7) {
      throw new Error("Calendar must be a 7 by 24 grid");
    }
    for (let i = 0; i < 7; i++) {
      if (calendar[i].length !== 24) {
        throw new Error("Calendar must be a 7 by 24 grid");
      }
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      throw new Error("Event not found");
    }
    const submission = await Submission.findOneAndUpdate(
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
      throw new Error("Submission for event with that ID not found");
    }
    return res.status(200).send({
      message: `Updated availability for event ${event.name} successfully`,
    });
  } catch (err) {
    return res.status(400).send({
      message: "Error updating availability for event",
      error: err.message,
    });
  }
};

const submissions_get_by_id = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      message: "Error fetching submissions for event",
      error: err.message,
    });
  }
  const submissions = await Submission.find({ eventId: req.params.id });
  return res
    .status(200)
    .send({ message: "Submissions fetched successfully", submissions });
};

export { submit_post_by_id, submit_put_by_id, submissions_get_by_id };
