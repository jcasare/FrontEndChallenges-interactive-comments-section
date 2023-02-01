const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user must be provided"],
    },
    review: {
      type: mongoose.Types.ObjectId,
      ref: "Review",
      required: [true, "initial reivew not specified"],
    },
    rating: {
      type: Number,
      required: [true, "rating must be provided"],
      min: 1,
      max: 5,
    },
    replyText: {
      type: String,
      minLength: [1, "reply text cannot be blank"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", ReplySchema);
