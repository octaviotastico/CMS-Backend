const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Learning model schema
const LearningSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  author: { type: String, required: true },
  description: { type: String, required: true },
  preview: { type: String },
  content: { type: String, required: true },
  tags: [{ type: String, required: true }],
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

module.exports = mongoose.model('learning', LearningSchema)
