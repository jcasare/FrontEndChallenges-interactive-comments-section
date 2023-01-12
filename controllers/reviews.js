const Review = require("../models/reviews");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { findOneAndReplace } = require("../models/reviews");

//getting all reviews with their respective author names

const getReviews = async (req, res) => {
  console.log(req.user);
  // const reviews = await Review.find({})
  //   .populate({ path: "user", select: "name _id" })
  //   .exec();
  // res.status(StatusCodes.OK).json({ reviews, myuser: req.user });
};

//create review

const createReview = async (req, res) => {
  // const tokenHeader = req.headers.cookie;
  // const access_token = tokenHeader.split("=")[1];
  // console.log(access_token);
  const token = req.signedCookies.token;
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(payload);
  const { userID, username } = req.user;
  const { reviewText, rating } = req.body;
  req.body.user = userID;

  if (!reviewText || !rating || !userID) {
    throw new BadRequestError("Make sure all fields are filled");
  }
  const existingReview = await Review.findOne({ ...req.body });
  if (existingReview) {
    throw new BadRequestError("Review already exists");
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
  res.status(StatusCodes.OK).json({ review, username });
};

//Delete Review
const deleteReview = async (req, res) => {
  const {
    user: { userID },
    params: { reviewID },
  } = req;
  const review = await Review.findOneAndDelete({ _id: reviewID, user: userID });
  if (!review) {
    throw new NotFoundError(`Review with id ${reviewID} doesn't exist`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `Job with id ${reviewID} has been deleted` });
};

module.exports = { getReviews, createReview, updateReview, deleteReview };
