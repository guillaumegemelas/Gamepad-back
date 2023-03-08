const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

//test envoi photo style avatar pour comprendre mécanique cloudinary-----------------
const cloudinary = require("cloudinary").v2;
//---------------------------------------------------------------------------------

const app = express();
app.use(express.json());
app.use(cors());

//connection à la DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

//---------------------------------------------------------------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
//---------------------------------------------------------------------------------

//route test
app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

//ROUTE Games
const gamesRoutes = require("./routes/games");
app.use(gamesRoutes);

//ROUTE user
const userRoutes = require("./routes/user");
app.use(userRoutes);

//ROUTE Favoris
const userFavourites = require("./routes/favourites");
app.use(userFavourites);

//ROUTE Review
const userReviews = require("./routes/review");
app.use(userReviews);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This routes doesn't exist" });
});

// app.listen(process.env.PORT || 3000, () => {
//   console.log("Serveur started 😀");
// });
app.listen(process.env.PORT || 3000, () => {
  console.log("Serveur started 😀");
});
