const Review = require("../models/reviews");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

//getting all reviews with their respective author names

const getReviews = async (req, res) => {
  const reviews = await Review.find({}).populate("user", "name").exec();
  res.status(StatusCodes.OK).json({ reviews });
};

//create review

const createReview = async (req, res) => {
  const { userID, username } = req.user;
  const { reviewText, rating } = req.body;
  req.body.userID = userID;
  if (!reviewText || !rating || !userID) {
    return res.status(StatusCodes.OK).json({ msg: "Review already exists" });
  }
  const existingReview = await Review.findOne({ ...req.body });
  if (!existingReview) {
    throw BadRequestError("Review already exists");
  }
  const review = await Review.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ review });
};

//Update Review

module.exports = { getReviews, createReview };
