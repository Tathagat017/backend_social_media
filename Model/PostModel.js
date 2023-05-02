const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: { type: String, required: true },
    authorId: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
const PostModel = mongoose.model("SocailMediaPosts", Schema);
module.exports = { PostModel };
