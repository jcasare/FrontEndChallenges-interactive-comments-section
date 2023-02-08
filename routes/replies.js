const express = require("express");
const router = express.Router();
const { createReply, deleteReply } = require("../controllers/replies");

router.route("/reviews/:reviewID/replies").post(createReply);
router.route("/reviews/:reviewID/replies/:replyID").delete(deleteReply);

module.exports = router;
