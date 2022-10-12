// Local Imports
import CalendarModel from "../models/calendar.js";
import { getUsersByUsername } from "./users.js";

const joinEventsWithUsers = async (events) => {
  return Promise.all(
    events.map(async (event) => ({
      ...event.toObject(),
      expositor: await getUsersByUsername(event.expositor),
    }))
  );
};

export const getAllEvents = async ({ page, amount }) => {
  // Returns events with pagination.
  const events = await CalendarModel.paginate({}, { page: page, limit: amount });
  return await joinEventsWithUsers(events.docs);
};

export const getAllCurrentEvents = async ({ page, amount }) => {
  // Returns all current events with pagination.
  const events = await CalendarModel.paginate(
    { startDate: { $lte: new Date() }, endDate: { $gte: new Date() } },
    { page: page, limit: amount }
  );

  return await joinEventsWithUsers(events.docs);
};

export const getAllUpcomingEvents = async ({ page, amount }) => {
  // Returns all upcoming events with pagination.
  const events = await CalendarModel.paginate({ startDate: { $gt: new Date() } }, { page: page, limit: amount });

  return await joinEventsWithUsers(events.docs);
};

export const getAllPastEvents = async ({ page, amount }) => {
  // Returns all past events with pagination.
  const events = await CalendarModel.paginate({ endDate: { $lt: new Date() } }, { page: page, limit: amount });

  return await joinEventsWithUsers(events.docs);
};

export const getEventByID = async (id) => {
  return await CalendarModel.findById({ _id: id });
};

export const postEvent = async (event) => {
  return await CalendarModel.dtCreate(event);
};

export const editEvent = async (id, event) => {
  return await CalendarModel.dtFindByIdAndUpdate(id, event);
};

export const deleteEvent = async (id) => {
  return await CalendarModel.dtFindByIdAndRemove(id);
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
