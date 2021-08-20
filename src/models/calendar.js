const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

// Calendar model schema
const CalendarSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  expositor: { type: String, required: true },
  preview: { type: String },
  tags: [{ type: String }],
});

// Extra options for mongoose
CalendarSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id // Change _id key to id
    delete ret._id   // Don't include the _id in JSON
    delete ret.__v   // Don't include the __v in JSON
    return ret
  }
};

CalendarSchema.plugin(mongoosePaginate);

CalendarSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
});

module.exports = mongoose.model('calendar', CalendarSchema);
