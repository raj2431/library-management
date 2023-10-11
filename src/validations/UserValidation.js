
const { body } = require('express-validator');
const { UserRepository } = require('../repository');

const register =
    [
        body('username', 'User name field is required').not().isEmpty().custom(value => {
            return UserRepository.findByUserName(value).then(user => {
                if (user) {
                    return Promise.reject('Username already in use');
                }
            });
        }),
        body('email', 'Please enter a valid email').not().isEmpty().isEmail().normalizeEmail({ gmail_remove_dots: true }).custom(value => {
            return UserRepository.findByEmail(value).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            });
        }),
        body('password', 'Please enter a password ').not().isEmpty(),
        body('password_confirmation').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            // Indicates the success of this synchronous custom validator
            return true;
        }),
    ];

const login =
    [

        body('email', 'Please enter a valid email').not().isEmpty().isEmail(),
        body('password', 'Please enter a password ').not().isEmpty()
    ];

const accountVerifyValidation = [
    body('email', 'Email field is required').not().isEmpty(),
    body('otp', 'OTP field is required').not().isEmpty()
];

module.exports = {
    register,
    login,
    accountVerifyValidation
};
