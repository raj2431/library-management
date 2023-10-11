const HttpCodes = require("../config/HttpCodes");
const HttpResponse = require("../response/HttpResponse");
const { BookService, UserBookService } = require("../services");

class UserBookController {

    /**
     * To borrow a book
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async borrow(req, res, next) {
        try {
            const { bookId, userId } = req.params;
            let books = await UserBookService.borrow(bookId, userId);
            return HttpResponse.sendAPIResponse(res, {}, HttpCodes.HTTP_CREATED, 'Book borrowed successfully.');
        } catch (error) {
            next(error);
        }
    }

    /**
     * To return a book
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async return(req, res, next) {
        try {
            const { bookId, userId } = req.params;
            let books = await UserBookService.return(bookId, userId);
            return HttpResponse.sendAPIResponse(res, {}, HttpCodes.HTTP_CREATED, 'Book return successfully.');
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new UserBookController;