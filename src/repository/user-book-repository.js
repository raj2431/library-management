const config = require("../config/config");
const UserBook = require("../models/UserBook");

class UserBookRepository {

    /**
    * Get row by userId and bookId
    * @param {*} userId 
    * @param {*} bookId 
    * @returns 
    */
    checkIfBookdIsborrowOrNot(userId, bookId) {
        return UserBook.findOne({
            user: userId,
            book: bookId,
            returnDate: null
        });
    }

    /**
     * To create
     * @param {*} userId 
     * @param {*} bookdId 
     * @returns 
     */
    create(userId, bookdId) {
        const userBook = new UserBook({
            user: userId,
            book: bookdId,
        });

        return userBook.save();
    }

    /**
     * Get all book borrow by a particular user
     * @param {*} userId 
     * @returns 
     */
    getBorrowedBookByUserId(userId) {
        return UserBook.find({ user: userId, returnDate: null })
            .populate('book')
            .exec();
    }

}

module.exports = new UserBookRepository;