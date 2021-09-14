const router = require('express').Router();
const { login, signup, mailConfirmation } = require('../controllers/auth.controllers');

router.post('/login', login);

router.post('/signup', signup);

router.get('/confirm/:confirmationCode', mailConfirmation);

module.exports = router;
