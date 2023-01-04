const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-error");

class ExistingEmailError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.name = "Existing Email Error";
  }
}

module.exports = ExistingEmailError;
