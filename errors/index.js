const BadRequestError = require("./Bad-Request");
const UnauthenticatedError = require("./Unauthenticated");
const CustomAPIError = require("./custom-error");
const ExistingEmailError = require("./existing-email");
module.exports = {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
  ExistingEmailError,
};
