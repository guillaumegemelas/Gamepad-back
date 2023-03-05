const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

//route 1 pour ajouter des review en post++++++++++++++++++++++++++

router.post("/addreview/:name", async (req, res) => {
  // router.post("/addreview/:name, async (req, res) => {
  //si l'id ne fonctionne pas, il va falloir passer par le nom du jeu comme les favoris

  //test avec params.id pour récupérer id du jeu
  //   const name = req.params.name;
  //   console.log(req.params);
  //   console.log(name);
  try {
    const { title, description, token, name } = req.body;

    //déclaration nouvel review
    const newReview = new Review({
      title: title,
      description: description,
      token: token,
      name: name,
    });

    //il faudra vérifier que un user ne peut poster qu'une seule review par jeu

    await newReview.save();

    const clientResponse = {
      title: newReview.title,
      description: newReview.description,
      id: newReview.id,
      name: newReview.name,
    };
    res.status(200).json(clientResponse);
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

module.exports = router;
