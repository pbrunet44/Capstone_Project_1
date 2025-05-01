// Created by Philip Brunet

class QueryError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

export default QueryError;
