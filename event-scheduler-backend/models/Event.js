// Created by Philip Brunet

import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Event name required"],
    },
    description: {
      type: String,
      required: [true, "Must provide a brief description of event"],
    },
    isRecurring: {
      type: Boolean,
    },
    finalizedTime: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Only registered users can organize new events"],
    },
  },
  { timestamps: true }
);

const Event = model("event", eventSchema);
export default Event;
