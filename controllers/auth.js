const User = require("../models/user");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("A user with this email already exists");
  }
  const user = await User.create({ ...req.body });
  const token = user.genToken();
  res.cookie("token", { token, user: { name: user.name } }, { signed: true });
  res.redirect("/main");
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
  const token = user.genToken();
  res.cookie("token", { token, user: { name: user.name } }, { signed: true });
};

module.exports = { register, login };
