
const { HttpStatusCode } = require('../../config/httpstatusCode')
const BaseError = require('./BaseError')

class UnAuthorizedError extends BaseError {
 constructor (
 name,
 statusCode = HttpStatusCode.UNAUTHORIZED,
 description = 'Unauthorized user',
 isOperational = true
 ) {
 super(name, statusCode, isOperational, description)
 }
}

module.exports = UnAuthorizedError