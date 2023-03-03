const express = require("express");
const router = express.Router();

const Favourite = require("../models/Favourites");

//route 1 pour ajouter des favoris en post: fonctionne au top!
router.post("/addfavourites", async (req, res) => {
  try {
    const { image, name } = req.body;

    //declaration nouveau favori
    const newFavourite = new Favourite({
      name: name,
      image: image,
    });

    //vérification si le favori est déjà présent en base de données:
    const newFavAlreadyAdded = await Favourite.findOne({ name });

    if (newFavAlreadyAdded) {
      return res.status(409).json({ message: "Favourite already added" });
    }
    //enregistrement nouveau fav en BDD
    await newFavourite.save();

    //déclaration réponse au client
    const clientResponse = {
      name: newFavourite.name,
      image: newFavourite.image,
    };
    //réponse
    res.status(200).json(clientResponse);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

//route2 pour récupérer les favoris en get
// router.get("/");

//route3 pour supprimer des favoris
// router.delete("/");

module.exports = router;

//création d'un model favourites?
