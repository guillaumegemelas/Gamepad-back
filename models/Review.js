const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  //à finaliser la création du model Review et aussi sur la partie front
  title: String,
  description: String,
  token: String,
  name: String,
});

module.exports = Review;
