const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv");
let validateEmail = function (email) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "username must be provided"],
    minLength: [3, "username cannot be less than 3 characters"],
    unique: [true, "username already exists"],
  },
  email: {
    type: String,
    required: [true, "email must be provided"],
    unique: [true, "email already exists"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
    validate: [validateEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
    minLenght: [6, "Password cannot be less than 6 characters"],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.genToken = async function () {
  return jwt.sign(
    { userID: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};
UserSchema.methods.comparePasswords = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
