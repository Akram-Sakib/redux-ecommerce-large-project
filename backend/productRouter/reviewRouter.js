const express = require("express");
const {
  createReview,
  getReviews,
  deleteReview,
} = require("../productController/reviewController");
const router = express.Router();
router.route("/addReview").post(createReview);
router.route("/getReview").get(getReviews);
router.route("/deleteReview/:id").delete(deleteReview);
module.exports = router;
