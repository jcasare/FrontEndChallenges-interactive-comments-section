const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const tokenExpiryDate = 300000;
const tokenMaxAge = 3600000;
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Kindly fill out all fields");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("A user with this email already exists");
  }
  const user = await User.create({ ...req.body });
  // const tempToken = await user.genToken();
  // const token = `Bearer ${tempToken}`;

  // res.cookie("token", token, {
  //   signed: true,
  //   maxAge: 3600000,
  //   expires: tokenInactivityTime,
  // });
  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", message: "Registration Successful!!" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  //check to see that email and password are being sent to the server for authentication
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  //check db to confirm if user email exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  //check to see if password entered on client side matches db password
  const isPasswordCorrect = user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  //generate token and send as cookie to redirected page
  const token = await user.genToken();
  res.cookie("token", token, {
    signed: true,
    expires: tokenExpiryDate,
    maxAge: tokenMaxAge,
    httpOnly: true,
    secure: true,
  });
  res.redirect("/dashboard");
};

module.exports = { register, login };
