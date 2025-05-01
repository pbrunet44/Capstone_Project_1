// Created by Philip Brunet

import Submission from "../models/Submission.js";
import QueryError from "../queryError.js";

class SubmissionService {
  static async createSubmission(submissionObj, customErrMsg) {
    const submission = Submission.create(submissionObj);
    if (!submission) {
      throw new QueryError(
        customErrMsg ? customErrMsg : "Could not create submission",
        500
      );
    }
  }

  static async getSubmission(filter) {
    const submission = await Submission.findOne(filter);
    return submission;
  }

  static async getSubmissions(filter) {
    const submissions = await Submission.find(filter);
    return submissions;
  }

  static async getFieldsFromSubmissions(filter, fields) {
    const submissions = await Submission.find(filter).select(fields);
    return submissions;
  }

  static async getSubmissionsPaginated(filter, sort, currPage, itemsPerPage) {
    const submissions = await Submission.find(filter)
      .sort(sort)
      .skip(currPage * itemsPerPage)
      .limit(itemsPerPage);
    return submissions;
  }

  static async countSubmissions(filter) {
    const numSubmissions = await Submission.countDocuments(filter);
    return numSubmissions;
  }

  static async updateSubmission(filter, updateObj) {
    const submission = await Submission.findOneAndUpdate(filter, updateObj);
    return submission;
  }
}

export default SubmissionService;
