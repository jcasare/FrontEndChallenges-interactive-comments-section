const express = require("express");
const router = express.Router();
const {
  createReply,
  deleteReply,
  updateReply,
} = require("../controllers/replies");

router.route("/reviews/:reviewID/replies").post(createReply);
router
  .route("/reviews/:reviewID/replies/:replyID")
  .delete(deleteReply)
  .patch(updateReply);

module.exports = router;
