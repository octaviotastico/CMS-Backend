const calendarService = require('../services/calendar.js');
const commons = require('../commons/functions.js');


const getAllEvents = async ({ page, amount }) => {
  commons.checkParams(page, amount);
  return await calendarService.getAllEvents({ page, amount });
};

const getAllCurrentEvents = async () => {
  return await calendarService.getAllCurrentEvents();
};

const getAllUpcomingEvents = async ({ page, amount }) => {
  commons.checkParams(page, amount);
  return await calendarService.getAllUpcomingEvents({ page, amount });
};

const getAllPastEvents = async ({ page, amount }) => {
  commons.checkParams(page, amount);
  return await calendarService.getAllPastEvents({ page, amount });
};

const getEventByID = async (id) => {
  commons.checkParams(id);
  return await calendarService.getEventByID(id);
};

const postEvent = async (event) => {
  commons.checkParams(event);
  const data = commons.getDefinedValues(event);
  return await calendarService.postEvent(data);
};

const editEvent = async (id, event) => {
  commons.checkParams(id, event);
  const data = commons.getDefinedValues(event);
  return await calendarService.editEvent(id, data);
};

const deleteEvent = async (id) => {
  commons.checkParams(id);
  return await calendarService.deleteEvent(id);
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