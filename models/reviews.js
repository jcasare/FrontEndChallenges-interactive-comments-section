const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user must be provided"],
    },
    rating: {
      type: Number,
      required: [true, "please provide rating from 1 to 5"],
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      minLength: [2, "review text cannot be less than 2 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);