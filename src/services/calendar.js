const CalendarModel = require('../models/calendar');

const getAllEvents = async ({page, amount}) => {
  if (page && amount) {
    // Returns events with pagination.
    return await CalendarModel.paginate({}, {
      page: page,
      limit: amount,
    });
  }
  // Returns all events.
  return await CalendarModel.find();
};

const getAllCurrentEvents = async () => {
  // Returns all current events.
  return await CalendarModel.find({
    startDate: {$lte: new Date()},
    endDate: {$gte: new Date()},
  });
};

const getAllUpcomingEvents = async ({ page, amount }) => {
  if (page && amount) {
    // Returns events with pagination.
    return await CalendarModel.paginate({
      startDate: {
        $gt: new Date(),
      },
    }, {
      page: page,
      limit: amount,
    });
  }
  // Returns all upcoming events.
  return await CalendarModel.find({
    startDate: {
      $gt: new Date(),
    },
  });
};

const getAllPastEvents = async ({ page, amount }) => {
  if (page && amount) {
    // Returns events with pagination.
    return await CalendarModel.paginate({
      endDate: {
        $lt: new Date(),
      },
    }, {
      page: page,
      limit: amount,
    });
  }
  // Returns all past events.
  return await CalendarModel.find({
    endDate: {
      $lt: new Date(),
    },
  });

};

const getEventByID = async ({ id }) => {
  return await CalendarModel.findById({ _id: id });
};

const postEvent = async (event) => {
  // TODO: Sync with other backends
  return await CalendarModel.create(event);
};

const editEvent = async (id, event) => {
  // TODO: Sync with other backends
  return await CalendarModel.findByIdAndUpdate(id, event);
};

const deleteEvent = async ({ id }) => {
  // TODO: Sync with other backends
  return await CalendarModel.findByIdAndRemove(id);
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