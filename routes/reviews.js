const express = require("express");
const router = express.Router();
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");

router.route("/reviews").get(getReviews).post(createReview);
router.route("/reviews/:id").patch(updateReview).delete(deleteReview);

module.exports = router;
