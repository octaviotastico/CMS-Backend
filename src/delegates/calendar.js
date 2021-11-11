const calendarService = require('../services/calendar.js');
const dtnBackendService = require('../services/dtnBackend');
const commons = require('../commons/functions.js');


const getAllEvents = async ({ page, amount }) => {
  return await calendarService.getAllEvents({ page, amount });
};

const getAllCurrentEvents = async () => {
  return await calendarService.getAllCurrentEvents();
};

const getAllUpcomingEvents = async ({ page, amount }) => {
  return await calendarService.getAllUpcomingEvents({ page, amount });
};

const getAllPastEvents = async ({ page, amount }) => {
  return await calendarService.getAllPastEvents({ page, amount });
};

const getEventByID = async (id) => {
  if (typeof id !== 'string' || id === '') {
    throw new Error('ID is required and must be a string');
  }

  return await calendarService.getEventByID(id);
};

const postEvent = async (event) => {
  const data = commons.getDefinedValues(event);

  // Saving to local database
  const res = await calendarService.postEvent(data);

  // Sync with DTN Backend
  // dtnBackendService.updateDTNBackends({
  //   endpoint: '/calendar/events',
  //   action: 'POST',
  //   payload: data,
  // }, "local-cms");


  return res;
};

const editEvent = async (id, event) => {
  const data = commons.getDefinedValues(event);

  // Saving to local database
  const res = await calendarService.editEvent(id, edit);

  // Sync with DTN Backend
  // dtnBackendService.updateDTNBackends({
  //   endpoint: `/calendar/event/${id}`,
  //   action: 'PATCH',
  //   payload: data,
  // }, "local-cms");

  return res;
};

const deleteEvent = async (id) => {
  // Saving to local database
  const res = await calendarService.deleteEvent(id);

  // Sync with DTN Backend
  // dtnBackendService.updateDTNBackends({
  //   endpoint: `/calendar/event/${id}`,
  //   action: 'DELETE',
  // }, "local-cms");

  return res;
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