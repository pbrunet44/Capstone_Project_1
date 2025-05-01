// Created by Philip Brunet

import User from "../models/User.js";
import argon2 from "argon2";
import { createToken, OneDaySecs } from "../middlewares/authMiddleware.js";
import AuthError from "../authError.js";
import QueryError from "../queryError.js";
import validator from "validator";
const { isEmail } = validator;

class AuthService {
  static async createUser(userObj, customErrMsg) {
    const hashedPw = await this.hashPassword(userObj.password);
    if (!hashedPw) {
      throw new QueryError(
        customErrMsg ? customErrMsg : "Could not hash password",
        500
      );
    }
    const user = await User.create({ ...userObj, password: hashedPw });
    if (!user) {
      throw new QueryError(
        customErrMsg ? customErrMsg : "Could not create user",
        500
      );
    }
    return user;
  }

  static createToken(user) {
    const token = createToken(user._id);
    const now = new Date();
    const tomorrow = new Date(now.getTime() + OneDaySecs * 1000);
    return { value: token, expires: tomorrow.toISOString() };
  }

  static async getUser(query, customErrMsg) {
    const user = await User.findOne(query);
    return user;
  }

  static async getUserById(UserId, customErrMsg) {
    const user = await User.findById(UserId);
    return user;
  }

  static async verifyUserDoesntExist(query, customErrMsg) {
    const existingUser = await User.findOne(query);
    if (existingUser) {
      throw new AuthError(
        customErrMsg ? customErrMsg : "Existing user was found",
        400
      );
    }
  }

  static async verifyPassword(hashedPw, unhashedPw, customErrMsg) {
    const verified = await argon2.verify(hashedPw, unhashedPw);
    if (!verified) {
      throw new AuthError(
        customErrMsg ? customErrMsg : "Incorrect password",
        400
      );
    }
  }

  static verifyEmail(email, customErrMsg) {
    if (!isEmail(email)) {
      throw new AuthError(
        customErrMsg ? customErrMsg : "Invalid email address",
        400
      );
    }
  }

  static async updateUser(userId, updateObj) {
    await User.findByIdAndUpdate(userId, updateObj);
  }

  static async hashPassword(password) {
    const hashedPw = await argon2.hash(password);
    return hashedPw;
  }
}

export default AuthService;
