// Library Imports
import mongoose from "delay-tolerant-mongoose";
import timestamps from "mongoose-timestamp";
const { Schema } = mongoose;

// Learning model schema
const ArticleSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String, required: true }],
  preview: { type: String },
});

// Extra options for mongoose
ArticleSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id; // Change _id key to id
    delete ret._id; // Don't include the _id in JSON
    delete ret.__v; // Don't include the __v in JSON
    return ret;
  },
};

// Extra properties for model
ArticleSchema.plugin(timestamps);

export default mongoose.model("articles", ArticleSchema);
