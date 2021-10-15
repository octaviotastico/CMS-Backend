const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

// People model schema
const UsersSchema = new Schema({
  // Basic info
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String },

  // Personal Data
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }, // Maybe for auth?

  // Contact Data
  twitter: { type: String },
  facebook: { type: String },
  github: { type: String },
  gitlab: { type: String },
  bitbucket: { type: String },
  linkedin: { type: String },
  website: { type: String },

  // Extra Data
  description: { type: String },
  skills: [{ type: Schema.Types.ObjectId, ref: 'skillInfo' }],
  experience: [{ type: Schema.Types.ObjectId, ref: 'experienceInfo' }],
  education: [{ type: Schema.Types.ObjectId, ref: 'educationInfo' }],
  languages: [{ type: Schema.Types.ObjectId, ref: 'languagueInfo' }],
  papers: [{ type: Schema.Types.ObjectId, ref: 'paperInfo' }],
  awards: [{ type: Schema.Types.ObjectId, ref: 'awardInfo' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'projectInfo' }],
  interests: [{ type: String }],

  // Maybe for future use xD
  // isAdmin: { type: Boolean, default: false },
  // isActive: { type: Boolean, default: true },
  // isVerified: { type: Boolean, default: false },
  // isBanned: { type: Boolean, default: false },
  // isDeleted: { type: Boolean, default: false },
  // isPublic: { type: Boolean, default: false },
  // isPrivate: { type: Boolean, default: false },
  // isHidden: { type: Boolean, default: false },
});

// Extra options for mongoose
UsersSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id // Change _id key to id
    delete ret._id   // Don't include the _id in JSON
    delete ret.__v   // Don't include the __v in JSON
    return ret
  }
};

// Extra properties for model
UsersSchema.plugin(mongoosePaginate);

// Extra properties for model
UsersSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
});

/////////////////////////////////////
/// ----- Secondary Schemas ----- ///
/////////////////////////////////////

const languagueSchema = new Schema({
  languague: { type: String },
  level: { type: String },
});

const educationSchema = new Schema({
  institution: { type: String },
  title: { type: String },
  carreer: { type: String },
  specialization: { type: String },
  startDate: { type: Date },
  finishDate: { type: Date },
  extraNotes: { type: String },
  multimedia: [{ type: String }],
});

const experienceSchema = new Schema({
  company: { type: String },
  jobTitle: { type: String },
  startDate: { type: Date },
  finishDate: { type: Date },
  extraNotes: { type: String },
  multimedia: [{ type: String }],
});

const paperSchema = new Schema({
  title: { type: String },
  authors: [{ type: String }],
  journal: { type: String },
  year: { type: String },
  multimedia: [{ type: String }],
});

const awardSchema = new Schema({
  title: { type: String },
  date: { type: Date },
  multimedia: [{ type: String }],
});

const prokectSchema = new Schema({
  title: { type: String },
  description: { type: String },
  externalUrl: { type: String },
  multimedia: [{ type: String }],
});

const skillSchema = new Schema({
  name: { type: String },
  level: { type: String },
});

// The secondary schemas are added to the main schema
mongoose.model('languagueInfo', languagueSchema);
mongoose.model('educationInfo', educationSchema);
mongoose.model('experienceInfo', experienceSchema);
mongoose.model('paperInfo', paperSchema);
mongoose.model('awardInfo', awardSchema);
mongoose.model('projectInfo', prokectSchema);
mongoose.model('skillInfo', skillSchema);

// The main schema is exported
module.exports = mongoose.model('users', UsersSchema);
