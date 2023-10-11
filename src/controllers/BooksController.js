const HttpCodes = require("../config/HttpCodes");
const HttpResponse = require("../response/HttpResponse");
const { BookService } = require("../services");

class BooksController {

    /**
     * To get all books
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async index(req, res, next) {
        try {
            let books = await BookService.getAllBooks(req.query.search, req.query.page);
            return HttpResponse.sendAPIResponse(res, books, HttpCodes.HTTP_OK, 'Book list');
        } catch (error) {
            next(error);
        }
    }

    /**
     * To create single book
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async create(req, res, next) {
        try {
            const { body } = req;
            let book = await BookService.create(body);
            return HttpResponse.sendAPIResponse(res, book, HttpCodes.HTTP_OK, 'Book successfully created!');
        } catch (error) {
            next(error);
        }
    }

    /**
     * To get book's detail
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async detail(req, res, next) {
        try {
            const bookID = req.params.id;
            let book = await BookService.detail(bookID);
            return HttpResponse.sendAPIResponse(res, book, HttpCodes.HTTP_OK, 'Book detail');
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new BooksController;