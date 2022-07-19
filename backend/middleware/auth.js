const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decodeData = jwt.verify(
    token,
    "6jhtugyyrewersdfcgftr54221edxjkdhjggfdcvgfcdvbrr655rgvxdf"
  );
  req.user = await User.findById(decodeData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  console.log(...roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return next(new ErrorHandler("Please Login to access this resource", 401));
//   }

//   const decodedData = jwt.verify(token, process.env.JWT_SECRETE);

//   req.user = await User.findById(decodedData.id);

//   next();
// });

// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHandler(
//           `Role: ${req.user.role} is not allowed to access this resouce `,
//           403
//         )
//       );
//     }

//     next();
//   };
// };
