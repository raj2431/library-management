
const UsersController = require('../controllers/UsersController');
const HttpExceptionHandler = require('../exceptions/HttpExceptionHandler');
const UserAuth = require('../middleware/user-auth');
const { UserValidation } = require('../validations');

const router = require('express').Router();


router.post('/users', UserValidation.register, HttpExceptionHandler.validation, UsersController.register);
router.post('/users/login', UserValidation.login, HttpExceptionHandler.validation, UsersController.login);
router.get('/users/:userId/books',UsersController.books);

module.exports = router;