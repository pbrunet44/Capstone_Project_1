// Created by Philip Brunet

import { Schema, model } from "mongoose";

const submissionSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    notes: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    calendar: {
      type: Array,
      required: [true, "Must include availability with submission"],
    },
  },
  { timestamps: true }
);

const Submission = model("submission", submissionSchema);
export default Submission;
