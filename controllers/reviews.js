const Review = require("../models/reviews");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { findOneAndReplace } = require("../models/reviews");

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
  const existingReview = await Review.findOne({ ...req.body });
  if (!existingReview) {
    throw BadRequestError("Review already exists");
  }
  const review = await Review.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ review, username });
};

//Update Review
const updateReview = async (req, res) => {
  const {
    body: { reviewText, rating },
    user: { userID, username },
    params: { reviewID },
  } = req;
  if (reviewText === "" || rating === "") {
    throw new BadRequestError("reviewText and rating fields cannot be empty");
  }
  const review = await findOneAndReplace(
    { _id: reviewID, user: userID },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!review) {
    throw new NotFoundError(`Review with id ${reviewID} doesn't exist`);
  }
  return res.status(StatusCodes.OK).json({ review, username });
};

//Delete Review
const deleteReview = async (req, res) => {};

module.exports = { getReviews, createReview, updateReview };
