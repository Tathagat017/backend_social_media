const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
const UserModel = mongoose.model("SocailMediaUser", Schema);
module.exports = { UserModel };
