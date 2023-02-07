const Reply = require("../models/replies");
const Review = require("../models/reviews");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { default: mongoose } = require("mongoose");

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

  // review.replies.push(replyID);
  // await review.save();
  // console.log(review.replies.toString());

  res.status(StatusCodes.CREATED).json({ reply: newReply });
};

module.exports = createReply;
