const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const bookScheema = new Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    ISBN: {
        type: String,
        required: true
    },

    quantity_available: {
        type: Number,
        required: true
    },

}, { timestamps: true });
module.exports = mongoose.model('Book', bookScheema);;