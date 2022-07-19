const mongoose = require("mongoose");
const validator = require("validator");

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
});

module.exports = mongoose.model("subscribe", subscribeSchema);
