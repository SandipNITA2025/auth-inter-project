const mongoose = require("mongoose");

//schema design:
const authSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

//export:
module.exports = mongoose.model("authModel", authSchema);
