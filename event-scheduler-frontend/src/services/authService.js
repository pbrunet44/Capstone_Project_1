// Created by Philip Brunet

import { api } from "../App";

class AuthService {
  static loginPost(submission, withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .post("/login", submission, {
          withCredentials: withCredentials,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static userPost(submission, withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .post("/user", submission, {
          withCredentials: withCredentials,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static userPut(submission, withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .put("/user", submission, {
          withCredentials: withCredentials,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static userGet(withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .get("/user", {
          withCredentials: withCredentials,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default AuthService;
