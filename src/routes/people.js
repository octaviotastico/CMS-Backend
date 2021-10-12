// Library Imports
const express = require('express');

// Local Imports
const routeController = require('../commons/routeController');
const peopleController = require('../controllers/people');
const { fileStorage } = require('../storage/storage');

// Routing
const router = express.Router();


// Get all the people with projection
router.get('/', (req, res) => {
  routeController.handleRequest(req, res, peopleController.getAllPeople);
});

// Get all the different tags of people
router.get('/tags', (req, res) => {
  routeController.handleRequest(req, res, peopleController.getAllTags);
});

// Get all the people with a tag
router.get('/tag/:tag', (req, res) => {
  routeController.handleRequest(req, res, peopleController.getAllPeopleOfTag);
});

// Get all the information about a person without projection
router.get('/person/:id', (req, res) => {
  routeController.handleRequest(req, res, peopleController.getPeopleByID);
});

// Post a new person
router.post('/', fileStorage.single('photo'), (req, res) => {
  routeController.handleRequest(req, res, peopleController.postPeople);
});

// Edit/Update an existing person
router.patch('/person/:id', fileStorage.single('photo'), (req, res) => {
  routeController.handleRequest(req, res, peopleController.editPeople);
});

// Delete an existing person
router.delete('/person/:id', (req, res) => {
  routeController.handleRequest(req, res, peopleController.deletePeople);
});

module.exports = router;
