const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

// Import du middleware isAuthenticated
const isAuthenticated = require("../middlewares/isAuthenticated");

//route 1 pour ajouter des review en post+++++++++++++++++++++++++++++

router.post("/addreview", isAuthenticated, async (req, res) => {
  // router.post("/addreview/:name, async (req, res) => {
  //si l'id ne fonctionne pas, il va falloir passer par le nom du jeu comme les favoris

  try {
    const { title, description, token, name, count } = req.body;

    //déclaration nouvel review
    const newReview = new Review({
      title: title,
      description: description,
      token: token,
      name: name,
      count: count,
    });

    //il faudra vérifier que un user ne peut poster qu'une seule review par jeu
    const newReviewAlreadyAdded = await Review.findOne({ name, token });

    if (newReviewAlreadyAdded) {
      return res
        .status(409)
        .json({ message: "you have already added a review for this game" });
    }
    // pour initier le compteur à 0
    if (!count) {
      newReview.count = 0;
    }

    await newReview.save();

    const clientResponse = {
      title: newReview.title,
      description: newReview.description,
      id: newReview.id,
      name: newReview.name,
      count: newReview.count,
    };
    res.status(200).json(clientResponse);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

//route 2 pour lire les reviews+++++++++++++++++++++++++++++++++++

router.get(
  "/review",
  // isAuthenticated,
  async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json({ reviews: reviews });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  }
);

//route 3 pour modifier Review?**********************************
// ajout count dans modèle review et fonctionne avec postman en

router.put(
  "/review/update1/:id",
  // isAuthenticated,
  async (req, res) => {
    const reviewToUpdate = await Review.findById(req.params.id);
    console.log(reviewToUpdate);
    try {
      reviewToUpdate.count = reviewToUpdate.count + 1;

      await reviewToUpdate.save();
      //pour mise à jour du front: le back doit renvoyer le tableau mis à jour
      const reviews = await Review.find();
      res.json({ reviews: reviews });
      // res.status(200).json("Reviews rate modified succesfully !");
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  }
);

router.put(
  "/review/update2/:id",
  // isAuthenticated,
  async (req, res) => {
    const reviewToUpdate = await Review.findById(req.params.id);
    console.log(reviewToUpdate);
    try {
      reviewToUpdate.count = reviewToUpdate.count - 1;

      await reviewToUpdate.save();
      //pour mise à jour du front: le back doit renvoyer le tableau mis à jour: sur game en front, dans button,
      //setReviews aura pour valeur le retour de la reponse json ci dessous.
      const reviews = await Review.find();
      res.json({ reviews: reviews });
      //
      // res.status(200).json("Reviews rate modified succesfully !");
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
