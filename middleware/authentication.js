const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/Unauthenticated");
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.signedCookies.token;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedMsg = await jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decodedMsg;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized for this route");
  }
};

module.exports = authenticationMiddleware;
