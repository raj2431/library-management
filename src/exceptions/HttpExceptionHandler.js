
const { check, validationResult } = require('express-validator');
const HttpResponse = require('../response/HttpResponse');
const HttpCodes = require('../config/HttpCodes');

class HttpExceptionHandler {
    /**
     * Exception handler
     * @param {*} err 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    handler(err, req, res, next) {
        let statusCode = err.statusCode || HttpCodes.HTTP_INTERNAL_SERVER_ERROR;
        let message = err.message
        
        switch (statusCode) {
            case HttpCodes.HTTP_UNAUTHORIZED:
                message = message || "Unauthenticated";
                break;

            case HttpCodes.HTTP_FORBIDDEN:
                message = message || "Forbidden";
                break;

            case HttpCodes.HTTP_NOT_FOUND:
                message = message || "Not found";
                break;

            case HttpCodes.HTTP_METHOD_NOT_ALLOWED:
                message = message || "Method Not Allowed"
                break;

            case HttpCodes.HTTP_UNPROCESSABLE_ENTITY:
                message = message || "Unprocessable entity";
                break;

            case HttpCodes.HTTP_INTERNAL_SERVER_ERROR:
                message = message;
                break;

            case HttpCodes.HTTP_BADREQUEST:
                message = message;
                break;
            default:
                message = "Internal Server Error";
                break;
        }
        return HttpResponse.sendAPIResponse(res, {}, statusCode, message);
    };

    /**
     * Validation handler
     * @param {*} err 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    validation(req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let message = "Unprocessable entity.";
            return HttpResponse.sendAPIResponse(res, errors.array(), HttpCodes.HTTP_UNPROCESSABLE_ENTITY, message);
        }
        next();
    }
}
module.exports = new HttpExceptionHandler();