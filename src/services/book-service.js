const { NotFoundError, BadRequestError, ValidationError } = require('../exceptions/app-exception');
const { BookRepository } = require("../repository");
const mongoose = require('mongoose');

class BookService {

    /**
     *  To get all books
     * @param {*} req 
     * @param {*} page 
     * @returns 
     */
    async getAllBooks(search = "", page = 1) {
        return BookRepository.getAllBooks(search, page);
    }

    /**
     * To create book
     * @param {*} data 
     * @returns 
     */
    async create(data) {

        // check if book is already exist
        const isExits = await BookRepository.findByAuthorAndTitle(data.author, data.title);
        if(isExits){
            throw new ValidationError("Book is alreay exist with this author");
        }

        let book = await BookRepository.create(data);
        return { book: book };
    }

    /**
     * To get book detail
     * @param {*} Id 
     * @returns 
     */
    async detail(Id) {
        let book = await BookRepository.findById(Id);
        if (!book) {
            throw new NotFoundError("Book does not exist!");
        }
        return { book: book };
    }
}

module.exports = new BookService;