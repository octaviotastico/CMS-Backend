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

const getAllUpcomingEvents = async ({ page, amount }) => {
  if (page && amount) {
    // Returns events with pagination.
    return await CalendarModel.paginate({
      $or: [{
        startDate: {
          $gt: new Date(),
        },
      }, {
        endDate: {
          $gt: new Date(),
        },
      }],
    }, {
      page: page,
      limit: amount,
    });
  }
  // Returns all upcoming events.
  return await CalendarModel.find({
    $or: [{
      startDate: {
        $gt: new Date(),
      },
    }, {
      endDate: {
        $gt: new Date(),
      },
    }],
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
  // Returns all upcoming events.
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
  getAllUpcomingEvents,
  getAllPastEvents,
  getEventByID,
  postEvent,
  editEvent,
  deleteEvent,
};