const express = require("express");
const {
  createSubscribe,
  getSubscriber,
} = require("../productController/subscribeController");
const router = express.Router();
router.route("/addSubscribe").post(createSubscribe);
router.route("/subscribes").get(getSubscriber);
module.exports = router;
