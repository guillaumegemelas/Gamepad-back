const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password, passwordConf } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing parameter" });
    }
    //renvoie de mesage d'erreur si l'email existe dejà en base de données----

    const emailAlreadyUsed = await User.findOne({ email });

    if (emailAlreadyUsed) {
      return res.status(409).json({ message: "This email is already used" });
    }

    //renvoie de mesage d'erreur si l'username existe dejà en base de données----

    const usernameAlreadyUsed = await User.findOne({ username });

    if (usernameAlreadyUsed) {
      return res.status(409).json({ message: "This username is already used" });
    }

    //test avec password à entrer 2 fois pour valider l'inscription
    if (password !== passwordConf) {
      return res.status(409).json({ message: "Passwords are different" });
    }

    const token = uid2(64);
    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);

    const newUser = new User({
      username,
      email,
      token,
      hash,
      salt,
    });

    await newUser.save();
    const response = {
      username: newUser.username,
      _id: newUser._id,
      token: newUser.token,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Unknown email" });
    }

    const newHash = SHA256(user.salt + password).toString(encBase64);
    // console.log(newHash);

    if (newHash !== user.hash) {
      return res.status(401).json({ message: "Wrong password" });
    }
    res.json({ _id: user._id, token: user.token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
