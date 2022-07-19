const mongoose = require("mongoose");
const validator = require("validator");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Opinion Description"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("review", reviewSchema);
