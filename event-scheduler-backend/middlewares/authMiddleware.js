// Created by Philip Brunet

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const OneDaySecs = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: OneDaySecs });
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
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

export { createToken, checkUser, OneDaySecs };
