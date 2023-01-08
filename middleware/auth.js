const UnauthenticatedError = require("../errors/Unauthenticated");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const signedCookies = req.signedCookies;
  const authToken = signedCookies.token;

  const refreshToken = async (oldToken) => {
    const payload = await jwt.verify(oldToken, process.env_JWT_SECRET);
    payload.exp = Date.now() / 1000 + 3600;
    const newToken = await jwt.sign(payload, process.env.JWT_SECRET);
    console.log(newToken);
    return `Bearer ${newToken}`;
  };
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.redirect("/");
  }
  const token = authToken.split(" ")[1];
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    if (payload.exp < Date.now() / 1000) {
      const refreshedToken = refreshToken(token);
      console.log("expired token");
      res.cookie("token", refreshedToken, { signed: true });
      req.user = { userID: payload.userID, username: payload.name };
      next();
    } else {
      console.log("fine token");
      req.user = { userID: payload.userID, username: payload.name };
    }
    next();
  } catch (error) {
    res.redirect("/");
    console.log(error);
  }
};

module.exports = authMiddleware;
