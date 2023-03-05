const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

//connection à la DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

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
// const userReviews = require("./routes/review");
// app.use(userReviews);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This routes doesn't exist" });
});

// app.listen(process.env.PORT || 3000, () => {
//   console.log("Serveur started 😀");
// });
app.listen(process.env.PORT || 3000, () => {
  console.log("Serveur started 😀");
});
