const Review = require("../models/reviews");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

//getting all reviews with their respective author names

const getReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({ path: "user", select: "name" })
    .exec();
  res.status(StatusCodes.OK).json({ reviews });
};

//create review

const createReview = async (req, res) => {
  const { userID, username } = req.user;
  const { reviewText, rating } = req.body;
  req.body.user = userID;
  console.log(req.body);
  if (!reviewText || !rating || !userID) {
    throw new BadRequestError("Make sure all fields are filled");
  }
  // const existingReview = await Review.findOne({ ...req.body });
  // if (!existingReview) {
  //   throw BadRequestError("Review already exists");
  // }
  const review = await Review.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ review, username });
};

//Update Review

module.exports = { getReviews, createReview };
