// Created by Philip Brunet

import { api } from "../App";

class SubmissionService {
  static submitPostById(id, submission, withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .post(`/submit/${id}`, submission, {
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

  static submitPutById(id, submission, withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .put(`/submit/${id}`, submission, {
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

  static submissionsGetById(id, withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .get(`/submissions/${id}`, { withCredentials: withCredentials })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static finalizePostById(id, day, time, withCredentials = true) {
    return new Promise((resolve, reject) => {
      api
        .post(
          `/finalize/${id}`,
          {
            finalizedTime: `${day} at ${time}`,
          },
          { withCredentials: withCredentials }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default SubmissionService;
