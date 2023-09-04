const { body } = require('express-validator');

exports.login_validator = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('email is required')
        .isLength({ min: 8, max: 20 })
        .withMessage('8 to 20 with all characters validation'),

    body('password')
        .not()
        .isEmpty()
        .withMessage('password is required')
        .isLength({ min: 8, max: 20 })
        .withMessage('8 to 20 with all characters validation'),

];
