// Created by Philip Brunet

import argon2 from "argon2";
import User from "../models/User.js";
import { createToken, OneDaySecs } from "../middlewares/authMiddleware.js";

const user_post = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!password) {
      throw new Error("Password required");
    }
    if (password.length < 8) {
      throw new Error("Passwords must be at least 8 characters long");
    }
    const hashPw = await argon2.hash(password);
    const user = await User.create({
      username,
      email,
      password: hashPw,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: OneDaySecs * 1000 });
    return res
      .status(201)
      .send({ message: `New user ${user.username} registered successfully` });
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      message: `Error while registering new user`,
      error: err.message,
    });
  }
};

const login_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!password) {
      throw new Error("Password required");
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error("Incorrect username or password");
    }
    const verified = await argon2.verify(user.password, password);
    if (!verified) {
      throw new Error("Incorrect username or password");
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: OneDaySecs * 1000 });
    return res
      .status(200)
      .send({ message: `User ${user.username} logged in successfully` });
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      message: `Error while logging in user`,
      error: err.message,
    });
  }
};

const user_get = async (req, res) => {
  try {
    if (!res.locals.user) {
      throw new Error("Users must be logged in to view their data");
    }
    return res.status(200).send({
      message: "User data fetched successfully",
      user: res.locals.user,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error fetching user info",
      error: err.message,
    });
  }
};

const user_put = async (req, res) => {
  const { username, email, oldPassword, newPassword } = req.body;
  try {
    if (!res.locals.user) {
      throw new Error("Users must be logged in to update their data");
    }
    if (!oldPassword) {
      throw new Error("Must provide old password to update user data");
    }
    const verified = await argon2.verify(res.locals.user.password, oldPassword);
    if (!verified) {
      throw new Error("Incorrect old password");
    }
    let update = {};
    if (username && username !== "" && res.locals.user.username !== username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Username already in use");
      }
      update = { username };
    }
    if (email && email !== "" && res.locals.user.email !== email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      update = { ...update, email };
    }
    if (newPassword && newPassword !== "") {
      const hashNewPw = await argon2.hash(newPassword);
      update = { ...update, password: hashNewPw };
    }
    await User.findByIdAndUpdate(res.locals.user._id, update);
    console.log(update);
    return res.status(200).send({
      message: "User data updated successfully",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error updating user info",
      error: err.message,
    });
  }
};

export { user_post, login_post, user_get, user_put };
