
const { HttpStatusCode } = require('../../config/httpstatusCode')
const BaseError = require('./BaseError')

class BadRequestError extends BaseError {
 constructor (
 name,
 statusCode = HttpStatusCode.BAD_REQUEST,
 description = 'Bad Request',
 isOperational = true
 ) {
 super(name, statusCode, isOperational, description)
 }
}

module.exports = BadRequestError