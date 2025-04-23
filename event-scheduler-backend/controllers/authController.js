// Created by Philip Brunet

import argon2 from "argon2";
import User from "../models/User.js";
import { createToken, OneDaySecs } from "../middlewares/authMiddleware.js";

const user_post = async (req, res) => {
  const { username, email, password } = req.body;
  let errorCode = 500;
  try {
    if (!password) {
      errorCode = 400;
      throw new Error("Password required");
    }
    if (password.length < 8) {
      errorCode = 400;
      throw new Error("Passwords must be at least 8 characters long");
    }
    if (!username) {
      errorCode = 400;
      throw new Error("Username required");
    }
    if (!email) {
      errorCode = 400;
      throw new Error("Email required");
    }
    const existingUserWithUsername = await User.findOne({ username });
    if (existingUserWithUsername) {
      errorCode = 400;
      throw new Error("Username already in use");
    }
    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      errorCode = 400;
      throw new Error("Email already in use");
    }
    const hashPw = await argon2.hash(password);
    const user = await User.create({
      username,
      email,
      password: hashPw,
    });
    const token = createToken(user._id);
    const now = new Date();
    const tomorrow = new Date(now.getTime() + OneDaySecs * 1000);
    return res.status(201).send({
      message: `New user ${user.username} registered successfully`,
      token: { value: token, expires: tomorrow.toISOString() },
    });
  } catch (err) {
    console.error(err);
    return res.status(errorCode).send({
      message: `Error while registering new user`,
      error: err.message,
    });
  }
};

const login_post = async (req, res) => {
  const { username, email, password } = req.body;
  let errorCode = 500;
  try {
    if (!password) {
      errorCode = 400;
      throw new Error("Password required");
    }
    if (!username) {
      errorCode = 400;
      throw new Error("Username required");
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      errorCode = 400;
      throw new Error("Incorrect username or password");
    }
    const verified = await argon2.verify(user.password, password);
    if (!verified) {
      errorCode = 400;
      throw new Error("Incorrect username or password");
    }
    const token = createToken(user._id);
    const now = new Date();
    const tomorrow = new Date(now.getTime() + OneDaySecs * 1000);
    return res.status(200).send({
      message: `User ${user.username} logged in successfully`,
      token: { value: token, expires: tomorrow.toISOString() },
    });
  } catch (err) {
    console.error(err);
    return res.status(errorCode).send({
      message: `Error while logging in user`,
      error: err.message,
    });
  }
};

const user_get = async (req, res) => {
  let errorCode = 500;
  try {
    if (!res.locals.user) {
      errorCode = 400;
      throw new Error("Users must be logged in to view their data");
    }
    return res.status(200).send({
      message: "User data fetched successfully",
      user: res.locals.user,
    });
  } catch (err) {
    return res.status(errorCode).send({
      message: "Error fetching user info",
      error: err.message,
    });
  }
};

const user_put = async (req, res) => {
  const { username, email, oldPassword, newPassword } = req.body;
  let errorCode = 500;
  try {
    if (!res.locals.user) {
      errorCode = 400;
      throw new Error("Users must be logged in to update their data");
    }
    if (!oldPassword) {
      errorCode = 400;
      throw new Error("Must provide old password to update user data");
    }
    const verified = await argon2.verify(res.locals.user.password, oldPassword);
    if (!verified) {
      errorCode = 400;
      throw new Error("Incorrect old password");
    }
    let update = {};
    if (username && username !== "" && res.locals.user.username !== username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        errorCode = 400;
        throw new Error("Username already in use");
      }
      update = { username };
    }
    if (email && email !== "" && res.locals.user.email !== email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        errorCode = 400;
        throw new Error("Email already in use");
      }
      update = { ...update, email };
    }
    if (newPassword && newPassword !== "") {
      const hashNewPw = await argon2.hash(newPassword);
      update = { ...update, password: hashNewPw };
    }
    await User.findByIdAndUpdate(res.locals.user._id, update);
    return res.status(200).send({
      message: "User data updated successfully",
    });
  } catch (err) {
    return res.status(errorCode).send({
      message: "Error updating user info",
      error: err.message,
    });
  }
};

const hello_get = async (req, res) => {
  return res
    .status(200)
    .send({ message: "Welcome to the Event Scheduler API" });
};

export { user_post, login_post, user_get, user_put, hello_get };
