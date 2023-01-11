const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
  session: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
