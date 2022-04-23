// Local Imports
import CalendarModel from "../models/calendar.js";

export const getAllEvents = async ({ page, amount }) => {
  if (page && amount) {
    // Returns events with pagination.
    return await CalendarModel.paginate(
      {},
      {
        page: page,
        limit: amount,
      }
    );
  }
  // Returns all events.
  return await CalendarModel.find();
};

export const getAllCurrentEvents = async () => {
  // Returns all current events.
  return await CalendarModel.find({
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  });
};

export const getAllUpcomingEvents = async ({ page, amount }) => {
  if (page && amount) {
    // Returns events with pagination.
    return await CalendarModel.paginate(
      {
        startDate: {
          $gt: new Date(),
        },
      },
      {
        page: page,
        limit: amount,
      }
    );
  }
  // Returns all upcoming events.
  return await CalendarModel.find({
    startDate: {
      $gt: new Date(),
    },
  });
};

export const getAllPastEvents = async ({ page, amount }) => {
  if (page && amount) {
    // Returns events with pagination.
    return await CalendarModel.paginate(
      {
        endDate: {
          $lt: new Date(),
        },
      },
      {
        page: page,
        limit: amount,
      }
    );
  }
  // Returns all past events.
  return await CalendarModel.find({
    endDate: {
      $lt: new Date(),
    },
  });
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
