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
  res.send("login");
};

module.exports = { register, login };
