const express = require("express");
const router = express.Router();
const createReply = require("../controllers/replies");

router.route("/").post(createReply);

module.exports = router;
