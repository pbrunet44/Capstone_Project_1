// Created by Philip Brunet

import { minPasswordLength } from "../middlewares/authMiddleware.js";
import AuthService from "../services/authService.js";
import AuthError from "../authError.js";

const userPost = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await AuthService.verifyUserDoesntExist(
      { username },
      "Username already in use"
    );
    await AuthService.verifyUserDoesntExist({ email }, "Email already in use");
    const user = await AuthService.createUser({ username, email, password });
    const token = AuthService.createToken(user);
    return res.status(201).send({
      message: `New user ${user.username} registered successfully`,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status ? err.status : 500).send({
      message: `Error while registering new user`,
      error: err.message,
    });
  }
};

const loginPost = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await AuthService.getUser({ username });
    if (!user) {
      throw new AuthError(customErrMsg ? customErrMsg : "User not found", 404);
    }
    await AuthService.verifyPassword(
      user.password,
      password,
      "Incorrect username or password"
    );
    const token = AuthService.createToken(user);
    return res.status(200).send({
      message: `User ${user.username} logged in successfully`,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status ? err.status : 500).send({
      message: `Error while logging in user`,
      error: err.message,
    });
  }
};

const userGet = async (req, res) => {
  try {
    return res.status(200).send({
      message: "User data fetched successfully",
      user: res.locals.user,
    });
  } catch (err) {
    return res.status(err.status ? err.status : 500).send({
      message: "Error fetching user info",
      error: err.message,
    });
  }
};

const userPut = async (req, res) => {
  const { username, email, password, newPassword } = req.body;
  try {
    await AuthService.verifyPassword(
      res.locals.user.password,
      password,
      "Incorrect old password"
    );
    let update = {};
    if (username && username !== "" && res.locals.user.username !== username) {
      await AuthService.verifyUserDoesntExist(
        { username },
        "Username already in use"
      );
      update = { username };
    }
    if (email && email !== "" && res.locals.user.email !== email) {
      await AuthService.verifyUserDoesntExist(
        { email },
        "Email already in use"
      );
      update = { ...update, email };
    }
    if (newPassword && newPassword !== "") {
      if (newPassword.length < minPasswordLength) {
        throw new AuthError(
          `Passwords must be at least ${minPasswordLength} characters long`,
          400
        );
      }
      const hashedNewPw = await AuthService.hashPassword(newPassword);
      update = { ...update, password: hashedNewPw };
    }
    await AuthService.updateUser(res.locals.user._id, update);
    return res.status(200).send({
      message: "User data updated successfully",
    });
  } catch (err) {
    return res.status(err.status ? err.status : 500).send({
      message: "Error updating user info",
      error: err.message,
    });
  }
};

const helloGet = async (req, res) => {
  return res
    .status(200)
    .send({ message: "Welcome to the Event Scheduler API" });
};

export { userPost, loginPost, userGet, userPut, helloGet };
