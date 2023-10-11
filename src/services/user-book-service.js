
const { ValidationError, NotFoundError, APIError, BadRequestError } = require('../exceptions/app-exception');
const { UserBookRepository, UserRepository, BookRepository } = require('../repository');

class UserBookService {

    /**
     * Service is using for borrowing book by a user
     * @param {*} bookdId 
     * @param {*} userId 
     * @returns 
     */
    async borrow(bookId, userId) {
        const user = await UserRepository.findById(userId)
        if (!user) {
            throw new NotFoundError("User not found.");
        }
        const book = await BookRepository.findById(bookId);

        if (!book) {
            throw new NotFoundError("Book not found.");
        }

        // Check if book is alredy borrowed

        let userBook = await UserBookRepository.checkIfBookdIsborrowOrNot(userId, bookId);

        if (userBook) {
            throw new BadRequestError("Book is already borrowed by this user");
        }



        // Check book is available or not
        if (book.quantity_available == 0) {
            throw new BadRequestError("No available copies of the book.");
        }
        await UserBookRepository.create(user._id, book._id);

        // Update the book quantity
        book.quantity_available -= 1;
        await book.save();

        return true;
    }

    /**
     * Service is using for return book by a user
     * @param {*} bookdId 
     * @param {*} userId 
     * @returns 
     */
    async return(bookdId, userId) {
        const user = await UserRepository.findById(userId)
        if (!user) {
            throw new NotFoundError("User not found.");
        }
        const book = await BookRepository.findById(bookdId);

        if (!book) {
            throw new NotFoundError("Book not found.");
        }

        // Check if book is borrow or not by this user
        const userBook = await UserBookRepository.checkIfBookdIsborrowOrNot(userId, bookdId);
        if (!userBook) {
            throw new BadRequestError("Book did not borrowed by the user.");
        }

        // Update the book quantity
        book.quantity_available += 1;
        await book.save();

        // Update the returnDate for the UserBook record
        userBook.returnDate = new Date();
        await userBook.save();

        return true;
    }

    /**
     * Get all books borrowed by a user
     * @param {*} userId 
     * @returns 
     */
    async getUserBooks(userId) {
        const user = await UserRepository.findById(userId)
        if (!user) {
            throw new NotFoundError("User not found.");
        }
        const books = await UserBookRepository.getBorrowedBookByUserId(userId);

        if (books.length == 0) {
            throw new NotFoundError("Does not borrow any book by this user");
        }

        return books;
    }
}


module.exports = new UserBookService;