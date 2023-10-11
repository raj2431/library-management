const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userScheema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    salt: {
        type: String,
        required: false
    }
}, { timestamps: true });


module.exports = mongoose.model('User', userScheema);;
