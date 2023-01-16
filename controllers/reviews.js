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
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const { userID } = payload;
  const reviews = await Review.find({})
    .sort({ createdAt: -1 })
    .populate({ path: "author", select: "name _id" })
    .exec();
  res.status(StatusCodes.OK).json({ reviews, userID });
};

const getSingleReview = async (req, res) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
  const { id: reviewID } = req.params;
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const { userID } = payload;
  const review = await Review.find({ _id: reviewID });
  if (!review) {
    throw NotFoundError(`Review with id ${reviewID} cannot be found`);
  }
  res.status(StatusCodes.OK).json({ review });
};

//create review

const createReview = async (req, res) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const { userID, name } = payload;
  const { reviewText, rating } = req.body;
  req.body.author = userID;

  if (!reviewText || !rating || !userID) {
    throw new BadRequestError("Make sure all fields are filled");
  }
  const existingReview = await Review.findOne({ ...req.body });
  if (existingReview) {
    throw new BadRequestError("Review already exists");
  }
  const newReview = await Review.create({ ...req.body });
  const review = await Review.find({ newReview })
    .populate({ path: "author", select: "name _id" })
    .exec();
  res.status(StatusCodes.CREATED).json({ review });
};

//Update Review
const updateReview = async (req, res) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const {
    body: { reviewText, rating },
    params: { id: reviewID },
  } = req;
  const { userID, username } = payload;
  req.body.author = userID;
  if (reviewText === "" || rating === "") {
    throw new BadRequestError("reviewText and rating fields cannot be empty");
  }
  const review = await Review.findOneAndReplace(
    { _id: reviewID, author: userID },
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
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
  const reviewID = req.params.id;
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const { userID, name } = payload;
  const review = await Review.findOneAndDelete({
    _id: reviewID,
    author: userID,
  });
  if (!review) {
    throw new NotFoundError(`Review with id ${reviewID} doesn't exist`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `Job with id ${reviewID} has been deleted` });
};

module.exports = {
  getReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
