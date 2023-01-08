const trialmiddleware = async (req, res, next) => {
  const authHeader = req.headers;
  console.log(authHeader);
  next();
};

module.exports = trialmiddleware;
