const express = require('express')
const dotenv = require('dotenv').config();
const app = express()
const createError = require('http-errors');
const port = process.env.PORT || 3000;
const { StatusCodes } = require('http-status-codes');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Adjust the limit as needed

app.use(cors());


const Exception = require('./exceptions/HttpExceptionHandler');
const userRoutes = require('./routes/users');
const booksRoutes = require('./routes/books');
const bookBorrowRoutes = require('./routes/books-borrow');

// DB connection
require('./config/database');

app.use('/api', userRoutes);
app.use('/api', booksRoutes);
app.use('/api', bookBorrowRoutes);

app.get('/', (req, res) => {
    res.send('Direct access is not allowed');
});

app.use(function (req, res, next) {
    next(createError(StatusCodes.NOT_FOUND));
});


// Expection
app.use(Exception.handler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});