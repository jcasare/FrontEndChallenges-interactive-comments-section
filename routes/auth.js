const { login, register } = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.route("/auth0/login").post(login);
router.route("/auth0/register").post(register);

module.exports = router;
