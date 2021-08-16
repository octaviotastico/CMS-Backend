const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Learning model schema
const LearningSchema = new Schema({
  category: { type: String },
  title: { type: String },
  subtitle: { type: String },
  author: { type: String },
  description: { type: String },
  preview: { type: String },
  content: { type: String },
  tags: [{ type: String }],
})

// Extra options for mongoose
LearningSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id // Change __id key to id
    delete ret._id   // Don't include the _id in JSON
    delete ret.__v   // Don't include the __v in JSON
    return ret
  }
}

LearningSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
})

LearningSchema.index({ city: 1, state_code: 1 }, { unique: true })

module.exports = mongoose.model('learning', LearningSchema)
