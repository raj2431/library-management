
const { body } = require('express-validator');

const create =
    [
        body('title', 'Title field is required').not().isEmpty(),
        body('author', 'Author field is required').not().isEmpty(),
        body('ISBN', 'ISBN field is required').not().isEmpty(),
        body('quantity_available', 'Quantity available field is required').not().isEmpty()
    ];

module.exports = {
    create
};