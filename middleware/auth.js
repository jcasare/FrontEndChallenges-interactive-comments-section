const UnauthenticatedError = require("../errors/Unauthenticated");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const token = req.signedCookies.token;

  const refreshToken = async (oldToken) => {
    const payload = await jwt.verify(oldToken, process.env_JWT_SECRET);
    payload.exp = Date.now() / 1000 + 3600;
    const newToken = await jwt.sign(payload, process.env.JWT_SECRET);
    console.log(newToken);
    return newToken;
  };
  if (!token) {
    return res.redirect("/");
  }

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
      res.cookie("token", token, { signed: true });
    }
    next();
  } catch (error) {
    res.redirect("/");
    console.log(error);
  }
};

module.exports = authMiddleware;
