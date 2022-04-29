const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  imgUrl: String,
  description: String,
  authorId: String,
  numberOfLikes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [Object],
    default: [],
  },
});

module.exports = mongoose.model("Post", postSchema);
