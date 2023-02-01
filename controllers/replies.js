const Reply = require("../models/replies");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const getReplies = async (req, res) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
};

const createReply = async (req, res) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const { userID, name } = payload;
  const { reviewID, replyText, rating } = req.body;
  req.body.author = userID;
  if (!reviewID || !replyText || !rating || !userID) {
    throw new BadRequestError(
      "Kindly ensure that all fields have been rightfully filled"
    );
  }
  const newReply = await Reply.create({ ...req.body });
  const reply = await Reply.find({ newReply })
    .populate({ path: "author", select: "name _id" })
    .exec();
  res.status(StatusCodes.CREATED).json({ reply });
};
