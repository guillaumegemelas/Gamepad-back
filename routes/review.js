const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

//route 1 pour ajouter des review en post++++++++++++++++++++++++++

router.post("/addreview", async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

//route 2 pour lire les reviews+++++++++++++++++++++++++++++++++++

router.get("/review", async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

//route 3 pour modifier favoris?**********************************

// module.exports = router;
