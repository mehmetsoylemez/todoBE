class BaseError extends Error {
  constructor(name, statusCode, isOperational, description) {
    super(name);

    Object.setPrototypeOf(this, new.target.prototype);
    this.description = description;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
