const mongoose = require("mongoose");

const Favourite = mongoose.model("Favourite", {
  name: String,
  image: String,
  token: String,
});

module.exports = Favourite;
