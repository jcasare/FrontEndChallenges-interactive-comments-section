const UnauthenticatedError = require("../errors/Unauthenticated");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   console.log(req.signedCookies);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Not authorized for this route");
  }
  const token = token.split(" ")[1];
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userID: payload.userID, username: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized for this route");
  }
};

module.exports = authMiddleware;
