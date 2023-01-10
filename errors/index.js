const CustomAPIError = require("./custom-error");
const BadRequestError = require("./Bad-Request");
const UnauthenticatedError = require("./Unauthenticated");
const NotFoundError = require("./notFound");
module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
};
