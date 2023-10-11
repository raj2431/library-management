
const HttpCodes = require("../config/HttpCodes");
const HttpResponse = require("../response/HttpResponse");
const { UserService, UserBookService } = require("../services");
const BaseController = require("./BaseController");

class UsersController extends BaseController {

    /**
     *  For registering
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async register(req, res, next) {
        try {
            const { body } = req;
            let user = await UserService.register(body);
            return HttpResponse.sendAPIResponse(res, user, HttpCodes.HTTP_OK, 'Congratulations, You have sucessfuly registered with us.');
        } catch (error) {
            next(error);
        }
    }

    /**
     * User can login using this method
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            let user = await UserService.login(email, password);
            return HttpResponse.sendAPIResponse(res, user, HttpCodes.HTTP_OK, 'Congratulations, You have sucessfuly loggedin');
        } catch (error) {
            next(error);
        }
    }

    async books(req, res, next) {
        try {
            const { userId } = req.params;
            let userBooks = await UserBookService.getUserBooks(userId);
            return HttpResponse.sendAPIResponse(res, userBooks, HttpCodes.HTTP_OK, "User's book fetched successfully.");
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new UsersController();