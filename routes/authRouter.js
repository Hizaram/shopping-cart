const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

// AUTHENTICATION
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

module.exports = router;
