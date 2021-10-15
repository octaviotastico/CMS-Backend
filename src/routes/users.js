// Library Imports
const express = require('express');

// Local Imports
const routeController = require('../commons/routeController');
const usersController = require('../controllers/users');
const { fileStorage } = require('../storage/storage');

// Routing
const router = express.Router();


// Get all the users with projection
router.get('/', (req, res) => {
  routeController.handleRequest(req, res, usersController.getAllUsers);
});

// Get all the information about a user without projection
router.get('/user/:id', (req, res) => {
  routeController.handleRequest(req, res, usersController.getUsersByID);
});

// Post a new user
router.post('/', fileStorage.single('photo'), (req, res) => {
  routeController.handleRequest(req, res, usersController.postUser);
});

// Edit/Update an existing user
router.patch('/user/:id', fileStorage.single('photo'), (req, res) => {
  routeController.handleRequest(req, res, usersController.editUser);
});

// Delete an existing user
router.delete('/user/:id', (req, res) => {
  routeController.handleRequest(req, res, usersController.deleteUsers);
});

router.post('/login', (req, res) => {
  routeController.handleRequest(req, res, usersController.login);
});

router.post('/signup', (req, res) => {
  routeController.handleRequest(req, res, usersController.signup);
});

// Get all the different skills of users
router.get('/skills', (req, res) => {
  routeController.handleRequest(req, res, usersController.getAllSkills);
});

// Get all the users with a skill
router.get('/skill/:skill', (req, res) => {
  routeController.handleRequest(req, res, usersController.getAllUsersWithSkill);
});

module.exports = router;
