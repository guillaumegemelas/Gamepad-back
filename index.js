const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

//route test
app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This routes doesn't exist" });
});

// app.listen(process.env.PORT || 3000, () => {
//   console.log("Serveur started 😀");
// });
app.listen(3000, () => {
  console.log("Serveur started 😀");
});
