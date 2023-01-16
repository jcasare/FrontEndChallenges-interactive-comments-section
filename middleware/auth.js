const UnauthenticatedError = require("../errors/Unauthenticated");
const jwt = require("jsonwebtoken");
const tokenExpiryDate = 300000;
const tokenMaxAge = 3600000;
const authMiddleware = async (req, res, next) => {
  const token = req.signedCookies.token;
  const refreshToken = async (oldToken) => {
    const payload = await jwt.verify(oldToken, process.env_JWT_SECRET);
    payload.exp = Date.now() / 1000 + 3600;
    const newToken = await jwt.sign(payload, process.env.JWT_SECRET);
    // console.log(newToken);
    return newToken;
  };
  if (!token) {
    return res.redirect("/");
  }

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    if (payload.exp < Date.now() / 1000) {
      const refreshedToken = refreshToken(token);
      // console.log("expired token");
      res.cookie("token", refreshedToken, {
        signed: true,
        expires: tokenExpiryDate,
        maxAge: tokenMaxAge,
        httpOnly: true,
        secure: true,
      });
      next();
    } else {
      res.cookie("token", token, {
        signed: true,
        expires: tokenExpiryDate,
        maxAge: tokenMaxAge,
        httpOnly: true,
        secure: true,
      });
    }
    next();
  } catch (error) {
    res.redirect("/");
    console.log(error);
  }
};

module.exports = authMiddleware;
