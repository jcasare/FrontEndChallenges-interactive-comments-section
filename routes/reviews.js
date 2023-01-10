const express = require("express");
const router = express.Router();
const { getReviews, createReview } = require("../controllers/reviews");

router.route("/reviews").get(getReviews).post(createReview);

module.exports = router;
