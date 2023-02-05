const express = require("express");
const router = express.Router();
const createReply = require("../controllers/replies");

router.route("/reviews/:reviewID/replies").post(createReply);

module.exports = router;
