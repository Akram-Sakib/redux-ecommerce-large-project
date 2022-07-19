const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Subscribe = require("../models/subscribeModel");

exports.createSubscribe = async (req, res, next) => {
  const subscribe = await Subscribe.create(req.body);
  res.status(201).json({
    success: true,
    subscribe,
  });
};

exports.getSubscriber = catchAsyncErrors(async (req, res, next) => {
  const subscribe = await Subscribe.find();
  res.status(200).json({
    success: true,
    subscribe,
  });
});
