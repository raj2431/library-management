
const config = require("../config/config");
const Book = require('../models/Book');

class BookRepository {

    /**
     * To get book by Id
     * @param {*} Id 
     * @returns 
     */
    async findById(Id) {
        return Book.findOne({ _id: Id });
    }



    /**
     * To get book by Id
     * @param {*} Id 
     * @returns 
     */
    async findByAuthorAndTitle(author, title) {
        return Book.findOne({ author: author, title: title });
    }


    /**
     * To get all books
     * @param {*} userId 
     * @param {*} page 
     * @returns 
     */
    async getAllBooks(userId = 0, page = 1) {
        const perPage = config.db.pagination.limit;
        const skip = (page - 1) * config.db.pagination.limit;
        let condition = {};

        // Query the database to get a page of books
        const books = await Book.find()
            .skip(skip)
            .limit(perPage);

        // Count the total number of books
        const totalCount = await Book.countDocuments();
        return {
            books,
            current_page: page,
            total_pages: Math.ceil(totalCount / perPage),
            total_books: totalCount,
        }
    }

    async create(data) {
        return await Book.create(data);

    }
}

module.exports = new BookRepository;