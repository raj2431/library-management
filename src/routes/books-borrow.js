const router = require('express').Router();
const BooksBorrowController = require('../controllers/UserBookController');

router.get('/borrow/:bookId/:userId', BooksBorrowController.borrow);
router.get('/return/:bookId/:userId', BooksBorrowController.return,);

module.exports = router;