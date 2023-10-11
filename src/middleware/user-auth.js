const { HTTP_UNAUTHORIZED } = require('../config/HttpCodes');
const HttpResponse = require('../response/HttpResponse');
const { ValidateSignature } = require('../utils');


const UserAuth = async (req, res, next) => {
    const isAuthorized = await ValidateSignature(req);
    if (isAuthorized) {
        return next();
    }
    return HttpResponse.sendAPIResponse(res, {}, HTTP_UNAUTHORIZED, 'UNAUTHORIZED');
}
module.exports = UserAuth;