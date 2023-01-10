const Review = require("../models/reviews");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const getReviews = async (req, res) => {
  res.send("get reviews");
};

const createReview = async (req, res) => {
  const { userID, username } = req.user;
  const { userReview, userRating } = req.body;
  req.body.userID = userID;
  if (!userReview || !userRating || !userID) {
    throw BadRequestError("Kindly provide a rating and review");
  }
  const review = await Review.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ review, name: username });
};

module.exports = { getReviews, createReview };
