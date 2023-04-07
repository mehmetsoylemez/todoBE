
const { HttpStatusCode } = require('../../config/httpstatusCode')
const BaseError = require('./BaseError')

class NotFoundError extends BaseError {
 constructor (
 name,
 statusCode = HttpStatusCode.FORBIDDEN,
 description = 'Record Not Found',
 isOperational = true
 ) {
 super(name, statusCode, isOperational, description)
 }
}

module.exports = NotFoundError