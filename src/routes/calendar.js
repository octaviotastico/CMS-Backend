// Library Imports
const express = require('express');

// Local Imports
const routeController = require('../commons/routeController');
const calendarController = require('../controllers/calendar');

// Routing
const router = express.Router();


// Get all the events.
router.get('/events', (req, res) => {
  routeController.handleRequest(req, res, calendarController.getAllEvents);
});

// Get all the upcoming events.
router.get('/events/upcoming', (req, res) => {
  routeController.handleRequest(req, res, calendarController.getAllUpcomingEvents);
});

// Get all the past events.
router.get('/events/past', (req, res) => {
  routeController.handleRequest(req, res, calendarController.getAllPastEvents);
});

// Get all the information about an event.
router.get('/event/:id', (req, res) => {
  routeController.handleRequest(req, res, calendarController.getEventByID);
});

// Post a new event.
router.post('/events', (req, res) => {
  routeController.handleRequest(req, res, calendarController.postEvent);
});

// Edit/Update an existing event.
router.patch('/event/:id', (req, res) => {
  routeController.handleRequest(req, res, calendarController.editEvent);
});

// Delete an existing event.
router.delete('/event/:id', (req, res) => {
  routeController.handleRequest(req, res, calendarController.deleteEvent);
});

module.exports = router;
