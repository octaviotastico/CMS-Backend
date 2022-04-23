// Local Imports
import calendarService from "../services/calendar.js";
import { checkParams, getDefinedValues } from "../commons/functions.js";

export const getAllEvents = async ({ page, amount }) => {
  return await calendarService.getAllEvents({ page, amount });
};

export const getAllCurrentEvents = async () => {
  return await calendarService.getAllCurrentEvents();
};

export const getAllUpcomingEvents = async ({ page, amount }) => {
  return await calendarService.getAllUpcomingEvents({ page, amount });
};

export const getAllPastEvents = async ({ page, amount }) => {
  return await calendarService.getAllPastEvents({ page, amount });
};

export const getEventByID = async (id) => {
  checkParams(id);
  return await calendarService.getEventByID(id);
};

export const postEvent = async (event) => {
  checkParams(event);
  const data = getDefinedValues(event);
  return await calendarService.postEvent(data);
};

export const editEvent = async (id, event) => {
  checkParams(id, event);
  const data = getDefinedValues(event);
  return await calendarService.editEvent(id, data);
};

export const deleteEvent = async (id) => {
  checkParams(id);
  return await calendarService.deleteEvent(id);
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
