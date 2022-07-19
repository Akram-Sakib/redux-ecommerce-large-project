const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../productController/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeApiKey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
