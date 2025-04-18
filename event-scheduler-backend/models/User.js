// Created by Philip Brunet

import { Schema, model } from "mongoose";
import validator from "validator";
const { isEmail } = validator;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email required."],
      validate: [isEmail, "Invalid email address."],
    },
    password: {
      type: String,
      required: [true, "Password required."],
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);
export default User;
