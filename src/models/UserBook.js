const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userBookScheema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    borrowDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model('UserBook', userBookScheema);;
