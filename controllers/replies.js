const Reply = require("../models/replies");
const Review = require("../models/reviews");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const createReply = async (req, res) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const { userID } = payload;
  const {
    body: { replyText, rating },
    params: { reviewID },
  } = req;
  req.body.author = userID;
  req.body.review = reviewID;
  if (!reviewID || !replyText || !rating || !userID) {
    throw new BadRequestError(
      "Kindly ensure that all fields have been rightfully filled"
    );
  }
  const review = await Review.findOne({ _id: reviewID });
  if (!review) {
    throw new BadRequestError(`No review with ID ${reviewID} exists...`);
  }

  const newReply = await Reply.create({ ...req.body });
  const replyID = newReply._id.toString();
  const replyAttachedToReview = await Review.findOneAndUpdate(
    { _id: reviewID },
    { $push: { replies: replyID } }
  );

  res.status(StatusCodes.CREATED).json({ reply: newReply });
};

const deleteReply = async (req, res) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const replyID = req.params.replyID;
  const reviewID = req.params.reviewID;

  const deleteSingleReply = await Review.findOneAndUpdate(
    { _id: reviewID, replies: replyID },
    { $pull: { replies: replyID } }
  );

  if (!deleteSingleReply) {
    throw new BadRequestError(
      `Review with ID ${reviewID} and or reply with ID ${replyID} doesn't exist`
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: `Reply with id ${replyID} has been deleted` });
};
const updateReply = async (req, res) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const { userID } = payload;
  const replyID = req.params.replyID;
  const reviewID = req.params.reviewID;
  req.body.author = userID;
  req.body.review = reviewID;
  const { rating, replyText } = req.body;
  if (!reviewID || !replyID || !rating || !replyText) {
    throw new BadRequestError(
      "Kindly ensure that all fields have been rightfully filled"
    );
  }
  // const updatedReply = await Reply.findOneAndUpdate(
  //   { _id: replyID },
  //   { ...req.body },
  //   { runValidators: true }
  // );
  const myOld = await Reply.findOneAndUpdate(
    { _id: replyID, review: reviewID },
    { ...req.body },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ myOld });
};

module.exports = { createReply, deleteReply, updateReply };
