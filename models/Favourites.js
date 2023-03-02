const mongoose = require("mongoose");

const Favourite = mongoose.model("Favourite", {
  //à finaliser la création du model favourite et aussi sur la partie front

  name: String,
  image: String,
  token: String,
});

// module.export = Favourite;
