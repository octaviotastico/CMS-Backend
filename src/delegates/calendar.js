const calendarService = require('../services/calendar.js');
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

const getEventByID = async ({ id }) => {
  if (typeof id !== 'string' || id === '') {
    throw new Error('ID is required and must be a string');
  }

  return await calendarService.getEventByID({ id });
};

const postEvent = async ({ title, description, startDate, endDate, expositor, preview, tags }) => {
  // TODO: Create a function like:
  // commons.checkRequiredFields(
  //   ['title', 'description', 'date', 'expositor'],
  //   { title, description, startDate, endDate, expositor }
  // );
  if (typeof title !== 'string' || title === '') {
    throw new Error('Title is required and must be a string');
  }

  if (typeof description !== 'string' || description === '') {
    throw new Error('Description is required and must be a string');
  }

  startDate = new Date(startDate);
  if (!commons.isValidDate(startDate)) {
    throw new Error('Start Date not provided or bad format');
  }

  endDate = new Date(endDate);
  if (!commons.isValidDate(endDate)) {
    throw new Error('End Date not provided or bad format');
  }

  if (typeof expositor !== 'string' || expositor === '') {
    throw new Error('Expositor is required');
  }

  return await calendarService.postEvent({ title, description, startDate, endDate, expositor, preview, tags });
};

const editEvent = async ({ id, title, description, startDate, endDate, expositor, preview, tags }) => {
  if (typeof id !== 'string' || id === '') {
    throw new Error('ID is required and must be a string');
  }

  const edit = {};

  if (typeof title !== 'undefined') {
    edit.title = title;
  }
  if (typeof description !== 'undefined') {
    edit.description = description;
  }
  if (typeof startDate !== 'undefined') {
    edit.startDate = startDate;
  }
  if (typeof endDate !== 'undefined') {
    edit.endDate = endDate;
  }
  if (typeof expositor !== 'undefined') {
    edit.expositor = expositor;
  }
  if (typeof preview !== 'undefined') {
    edit.preview = preview;
  }
  if (typeof tags !== 'undefined') {
    edit.tags = tags;
  }

  return await calendarService.editEvent(id, edit);
};

const deleteEvent = async ({ id }) => {
  if (typeof id !== 'string' || id === '') {
    throw new Error('ID is required and must be a string');
  }

  return await calendarService.deleteEvent({ id });
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