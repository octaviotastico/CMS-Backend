// Library Imports
const express = require('express');

// Local Imports
const authController = require('../controllers/auth');

// Routing
const router = express.Router();


router.post('/login', (req, res) => {
  authController.login(req, res);
});

router.post('/signup', (req, res) => {
  authController.signup(req, res);
});

module.exports = router;
