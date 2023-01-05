const UnauthenticatedError = require("../errors/Unauthenticated");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const { token } = req.signedCookies.token;
  //   console.log(req.signedCookies);
  if (!token || !token.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Not authorized for this route");
  }
  const finalToken = token.split(" ")[1];
  try {
    const payload = await jwt.verify(finalToken, process.env.JWT_SECRET);

    req.user = { userID: payload.userID, username: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized for this route");
  }
};

module.exports = authMiddleware;
