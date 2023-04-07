const { HttpStatusCode } = require("../../config/httpstatusCode");
const BaseError = require("./BaseError");

function logError(err, req, res, next) {
  // TODO mehmets : needs adding logging mechanism instead of console.log => upcoming feature (Good to have)
  console.log(err);
  next(err);
}

function logUnhandledError(err, req, res) {
  // TODO mehmets : needs adding logging mechanism instead of console.log => upcoming feature (Good to have)
  console.log(err);
}

function returnError(err, req, res, next) {
  res
    .status(err.statusCode || HttpStatusCode.INTERNAL_SERVER)
    .send(err.message);
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = {
  logError,
  logUnhandledError,
  returnError,
  isOperationalError,
};
