const Reply = require("../models/replies");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const createReply = async (req, res) => {
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/");
  }
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  if (!payload) {
    throw new UnauthenticatedError("Not authorized for this route");
  }
  const { userID } = payload;
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

module.exports = createReply;
