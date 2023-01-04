const { StatusCodes } = require("http-status-codes");
const notFoundError = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).send(`Route doesn't exist`);
};
module.exports = notFoundError;
