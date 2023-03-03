const express = require("express");
const router = express.Router();
const axios = require("axios");

//cumul deux requetes: page home et après redirection, nouvelle requete par la meme route pour afficher les 5 jeux identiques----

//first ROUTE page game global result----------------------------------------

router.get("/games", async (req, res) => {
  const apiKey = process.env.YOUR_API_KEY;
  let { search, page, value, platforms, genres } = req.query;

  if (!search) {
    search = "";
  }
  if (!page) {
    page = 1;
  }
  if (!value) {
    value = "";
  }

  let response;

  //modif: 2 requetes par rapport au tri par plateforme au niveau du front: si platform non renseigné, au chgment de la page, 0 resultats...
  try {
    if (platforms && genres) {
      response = await axios.get(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${search}&page=${page}&ordering=${value}&platforms=${platforms}&genres=${genres}`
      );
    } else if (platforms && !genres) {
      response = await axios.get(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${search}&page=${page}&ordering=${value}&platforms=${platforms}`
      );
    } else if (!platforms && genres) {
      response = await axios.get(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${search}&page=${page}&ordering=${value}&genres=${genres}`
      );
    } else {
      response = await axios.get(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${search}&page=${page}&ordering=${value}`
      );
    }

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// second ROUTE en get vers games id-----------------------------------------------

router.get("/games/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  console.log(id);

  const apiKey = process.env.YOUR_API_KEY;

  if (id) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${apiKey}`
      );
      console.log(req.params, "after requete");
      console.log(
        response.data,
        "------------😀-------------response.data-gamesid"
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
});

// -----------------------------------------------------

// third ROUTE en get vers gamesSearch-----------------------------------------------

// router.get("/games/search", async (req, res) => {
//   const apiKey = process.env.YOUR_API_KEY;
//   let { search } = req.query;

//   if (!search) {
//     search = "";
//   }

//   try {
//     const response = await axios.get(
//       `https://api.rawg.io/api/games?key=${apiKey}&search=${search}`
//     );

//     console.log(response.data.results);
//     res.status(200).json(response.data.results);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// });

// -----------------------------------------------------

module.exports = router;
