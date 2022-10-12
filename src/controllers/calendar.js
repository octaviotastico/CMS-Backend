// Local Imports
import calendarDelegate from "../delegates/calendar.js";

const calculateEndDate = (startDate, duration) => {
  const endDate = new Date(startDate);
  const [hours, minutes] = duration.split(":");
  endDate.setHours(endDate.getHours() + parseInt(hours));
  endDate.setMinutes(endDate.getMinutes() + parseInt(minutes));
  return endDate;
};

/**
 * Returns all the events no matter the date,
 * with optional pagination.
 */
export const getAllEvents = async (req, res) => {
  const { page = 0, amount = 100 } = req.query;
  const response = await calendarDelegate.getAllEvents({ page, amount });
  res.status(201).json(response);
  return response;
};

/**
 * Returns all the current events.
 */
export const getAllCurrentEvents = async (req, res) => {
  const { page = 0, amount = 100 } = req.query;
  const response = await calendarDelegate.getAllCurrentEvents({ page, amount });
  res.status(201).json(response);
  return response;
};

/**
 * Returns all the upcoming events.
 */
export const getAllUpcomingEvents = async (req, res) => {
  const { page = 0, amount = 100 } = req.query;
  const response = await calendarDelegate.getAllUpcomingEvents({ page, amount });
  res.status(201).json(response);
  return response;
};

/**
 * Returns all the past events.
 */
export const getAllPastEvents = async (req, res) => {
  const { page = 0, amount = 100 } = req.query;
  const response = await calendarDelegate.getAllPastEvents({ page, amount });
  res.status(201).json(response);
  return response;
};

/**
 * Returns all the event info by ID.
 */
export const getEventByID = async (req, res) => {
  const { id } = req.params;
  const response = await calendarDelegate.getEventByID(id);
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(201).json(response);
  }
  return response;
};

/**
 * Creates a new event in the calendar.
 */
export const postEvent = async (req, res) => {
  const { title, description, startDate, duration, preview, tags } = req.body;
  const { username } = req.decodedToken;
  const response = await calendarDelegate.postEvent({
    title,
    description,
    startDate,
    duration,
    endDate: calculateEndDate(startDate, duration),
    expositor: username,
    preview,
    tags,
  });
  res.status(201).json(response);
  return response;
};

/**
 * Edits an event.
 */
export const editEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, duration, preview, tags } = req.body;
  const { username } = req.decodedToken;
  const response = await calendarDelegate.editEvent(id, {
    title,
    description,
    startDate,
    duration,
    endDate: calculateEndDate(startDate, duration),
    expositor: username,
    preview,
    tags,
  });
  res.status(201).json(response);
  return response;
};

/**
 * Deletes an event.
 */
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const response = await calendarDelegate.deleteEvent(id);
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
  return response;
};

export default {
  getAllEvents,
  getAllCurrentEvents,
  getAllUpcomingEvents,
  getAllPastEvents,
  getEventByID,
  postEvent,
  editEvent,
  deleteEvent,
};
