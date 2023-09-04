const express = require('express');
const router = express.Router();

const { login_validator } = require('../validation/user-validation')

const { signUp, login } = require('../controller/user-controller')


router.post('/signUp', signUp);
router.post('/login', login_validator, login);

module.exports = router;
