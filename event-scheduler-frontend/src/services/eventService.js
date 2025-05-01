// Created by Philip Brunet

import { api } from "../App";

class EventService {
  static eventGetById(id, withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .get(`/event/${id}`, { withCredentials: withCredentials })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static eventPost(event, withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .post("/event", event, { withCredentials: withCredentials })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static myeventsGet(role, pageNum, withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .get(`/myevents?role=${role}&p=${pageNum}`, {
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

export default EventService;
