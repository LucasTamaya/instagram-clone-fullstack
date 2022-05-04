const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  imgUrl: String,
  description: String,
  authorId: String,
  like: {
    type: [String],
    default: [],
  },
  comments: {
    type: [Object],
    default: [],
  },
});

module.exports = mongoose.model("Post", postSchema);
