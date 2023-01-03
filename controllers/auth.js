const login = async (req, res) => {
  res.send("login successful");
};

const register = async (req, res) => {
  res.send("register done");
};

module.exports = { login, register };
