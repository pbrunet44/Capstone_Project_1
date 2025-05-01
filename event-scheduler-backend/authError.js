// Created by Philip Brunet

class AuthError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

export default AuthError;
