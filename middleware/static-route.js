const staticRouteMiddleware = (req, res, next) => {
  if (req.path === "/main.html") {
    return res.status(404).json({ msg: "Access Denied" });
  }

  next();
};
module.exports = staticRouteMiddleware;
