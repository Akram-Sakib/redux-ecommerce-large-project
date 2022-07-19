const cloudinary = require("cloudinary");
const Review = require("../models/ReviewModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// exports.createReview = async (req, res, next) => {
//   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//     folder: "review",
//     width: 500,
//     crop: "scale",
//   });
//   const { name, email, description } = req.body;
//   const review = await Review.create({
//     name,
//     email,
//     description,
//     avatar: myCloud.url,
//     avatarId: myCloud.public_id,
//   });
//   res.status(201).json({
//     success: true,
//     review,
//   });
// };
exports.createReview = async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images?.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "review",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  const review = await Review.create(req.body);
  res.status(201).json({
    success: true,
    review,
  });
};

exports.getReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    success: true,
    reviews,
  });
});

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ErrorHandler("review not found", 404));
  }
  // Deleting Images From Cloudinary
  for (let i = 0; i < review.images?.length; i++) {
    await cloudinary.v2.uploader.destroy(review.images[i].public_id);
  }
  await review.remove();
  res.status(200).json({
    success: true,
    message: "Review Delete Successfully",
  });
});
