const calendarDelegate = require('../delegates/calendar');

/*
 * Returns all the events no matter the date,
 * with optional pagination.
 */
const getAllEvents = async (req, res) => {
  const { page, amount } = req.query;
  const response = await calendarDelegate.getAllEvents({ page, amount });
  res.status(201).json(response);
  return response;
};

/*
 * Returns all the current events.
 */
const getAllCurrentEvents = async (req, res) => {
  const response = await calendarDelegate.getAllCurrentEvents();
  res.status(201).json(response);
  return response;
};

/*
 * Returns all the upcoming events.
 */
const getAllUpcomingEvents = async (req, res) => {
  const { page, amount } = req.query;
  const response = await calendarDelegate.getAllUpcomingEvents({ page, amount });
  res.status(201).json(response);
  return response;
};

/*
 * Returns all the past events.
 */
const getAllPastEvents = async (req, res) => {
  const { page, amount } = req.query;
  const response = await calendarDelegate.getAllPastEvents({ page, amount });
  res.status(201).json(response);
  return response;
};

/*
 * Returns all the event info by ID.
 */
const getEventByID = async (req, res) => {
  const { id } = req.params;
  const response = await calendarDelegate.getEventByID(id);
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(201).json(response);
  }
  return response;
};

/*
 * Creates a new event in the calendar.
 */
const postEvent = async (req, res) => {
  const { title, description, startDate, endDate, expositor, preview, tags } = req.body;
  const response = await calendarDelegate.postEvent({ title, description, startDate, endDate, expositor, preview, tags });
  res.status(201).json(response);
  return response;
};

/*
 * Edits an event.
 */
const editEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate, expositor, preview, tags } = req.body;
  const response = await calendarDelegate.editEvent(id, { title, description, startDate, endDate, expositor, preview, tags });
  res.status(201).json(response);
  return response;
};

/*
 * Deletes an event.
 */
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const response = await calendarDelegate.deleteEvent(id);
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
  return response;
};

module.exports = {
  getAllEvents,
  getAllCurrentEvents,
  getAllUpcomingEvents,
  getAllPastEvents,
  getEventByID,
  postEvent,
  editEvent,
  deleteEvent,
};