const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  ExistingEmailError,
} = require("../errors");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ExistingEmailError("Email exists...please login");
  }
  const user = await User.create({ ...req.body });
  const token = user.genToken();
  res.cookie("token", { token, user: { name: user.name } }, { signed: true });
  res.redirect("/main");
};

const login = async (req, res) => {
  res.send("logged  in");

  res.send("login successful");
};

module.exports = { login, register };
