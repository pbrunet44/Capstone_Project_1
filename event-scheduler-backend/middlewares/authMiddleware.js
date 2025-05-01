// Created by Philip Brunet

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const minPasswordLength = 8;
const OneDaySecs = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: OneDaySecs });
};

const checkUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedToken) => {
      if (err) {
        console.error(err);
        res.locals.user = null;
      } else {
        let user = await User.findById(verifiedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({
      message: "Bad request",
      error: "Email required",
    });
  }
  next();
};

const requireUsername = (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send({
      message: "Bad request",
      error: "Username required",
    });
  }
  next();
};

const requirePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({
      message: "Bad request",
      error: "Password required",
    });
  }
  next();
};

const requireMinPasswordLength = (req, res, next) => {
  const { password } = req.body;
  if (password.length < minPasswordLength) {
    return res.status(400).send({
      message: "Bad request",
      error: `Passwords must be at least ${minPasswordLength} characters long`,
    });
  }
  next();
};

const requireLogin = (req, res, next) => {
  if (!res.locals.user) {
    return res.status(401).send({
      message: "Unauthorized request",
      error: "Requires login",
    });
  }
  next();
};

export {
  createToken,
  checkUser,
  requireUsername,
  requireEmail,
  requirePassword,
  requireMinPasswordLength,
  requireLogin,
  OneDaySecs,
  minPasswordLength,
};
