const HttpExceptionHandler = require('../exceptions/HttpExceptionHandler');
const UserAuth = require('../middleware/user-auth');

const router = require('express').Router();
const BooksController = require('../controllers/BooksController');
const { BooksValidation } = require('../validations');

router.get('/books', BooksController.index);
router.post('/books', BooksValidation.create, HttpExceptionHandler.validation, BooksController.create);
router.get('/books/:id', BooksController.detail);

module.exports = router;