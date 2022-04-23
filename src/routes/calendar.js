// Library Imports
import express from "express";

// Local Imports
import { handleRequest } from "../commons/routeController.js";
import calendarController from "../controllers/calendar.js";
import { fileStorage } from "../storage/storage.js";

// Routing
const router = express.Router();

// Get all the events.
router.get("/events", (req, res) => {
  handleRequest(req, res, calendarController.getAllEvents);
});

// Get current events.
router.get("/events/current", (req, res) => {
  handleRequest(req, res, calendarController.getAllCurrentEvents);
});

// Get all the upcoming events.
router.get("/events/upcoming", (req, res) => {
  handleRequest(req, res, calendarController.getAllUpcomingEvents);
});

// Get all the past events.
router.get("/events/past", (req, res) => {
  handleRequest(req, res, calendarController.getAllPastEvents);
});

// Get all the information about an event.
router.get("/event/:id", (req, res) => {
  handleRequest(req, res, calendarController.getEventByID);
});

// Post a new event.
router.post("/events", fileStorage.single("preview"), (req, res) => {
  handleRequest(req, res, calendarController.postEvent);
});

// Edit/Update an existing event.
router.patch("/event/:id", fileStorage.single("preview"), (req, res) => {
  handleRequest(req, res, calendarController.editEvent);
});

// Delete an existing event.
router.delete("/event/:id", (req, res) => {
  handleRequest(req, res, calendarController.deleteEvent);
});

export default router;
