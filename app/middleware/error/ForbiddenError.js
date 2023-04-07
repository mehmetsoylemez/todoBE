
const { HttpStatusCode } = require('../../config/httpstatusCode')
const BaseError = require('./BaseError')

class ForbiddenError extends BaseError {
 constructor (
 name,
 statusCode = HttpStatusCode.FORBIDDEN,
 description = 'Forbidden request',
 isOperational = true
 ) {
 super(name, statusCode, isOperational, description)
 }
}

module.exports = ForbiddenError