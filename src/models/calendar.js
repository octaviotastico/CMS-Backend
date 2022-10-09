// Library Imports
import mongoose from "delay-tolerant-mongoose";
import timestamps from "mongoose-timestamp";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

// Calendar model schema
const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  duration: { type: String, required: true },
  endDate: { type: Date },
  expositor: { type: String, required: true },
  preview: { type: String },
  tags: [{ type: String }],
});

// Extra options for mongoose
EventSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id; // Change _id key to id
    delete ret._id; // Don't include the _id in JSON
    delete ret.__v; // Don't include the __v in JSON
    return ret;
  },
};

// Extra properties for model
EventSchema.plugin(mongoosePaginate);

// Extra properties for model
EventSchema.plugin(timestamps);

export default mongoose.model("events", EventSchema);
