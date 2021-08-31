const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

// Peoplr model schema
const PeopleSchema = new Schema({
  // Personal Data
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  photo: { type: String },

  // Contact Data
  twitter: { type: String },
  facebook: { type: String },
  github: { type: String },
  gitlab: { type: String },
  bitbucket: { type: String },
  linkedin: { type: String },
  website: { type: String },

  // Extra Data
  specialty: { type: String },
  notes: { type: String },
  tags: [{ type: String }],
});

// Extra options for mongoose
PeopleSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id // Change _id key to id
    delete ret._id   // Don't include the _id in JSON
    delete ret.__v   // Don't include the __v in JSON
    return ret
  }
};

// Extra properties for model
PeopleSchema.plugin(mongoosePaginate);

// Extra properties for model
PeopleSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
});

module.exports = mongoose.model('people', PeopleSchema);
