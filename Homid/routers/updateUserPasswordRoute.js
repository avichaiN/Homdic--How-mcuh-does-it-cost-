const express = require("express");
const jwt = require("jwt-simple");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 12;
require("dotenv").config();
const User = require("../models/user");

router.get("/", async (req, res) => {
  const encodedId = req.baseUrl.replace("/", "");
  const decodedId = jwt.decode(encodedId, process.env.SECRET);
  try {
    const userFound = await User.findOne({ _id: decodedId });
    res.send({ user: userFound.firstName });
  } catch (e) {
    console.log(e);
  }
});

router.post("/", (req, res) => {
  let newPassword = req.body.newPassword;
  bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
    try {
      newPassword = hash;
      const encodedId = req.headers.referer.replace(
        "http://localhost:3000/updateUserPassword.html",
        ""
      );
      console.log(encodedId);

      const decodedId = jwt.decode(encodedId, process.env.SECRET);
      const userFound = await User.findOneAndUpdate(
        { _id: decodedId },
        {
          password: hash,
        }
      );

      const token = jwt.encode(
        {
          role: userFound.role,
          username: userFound.username,
          name: userFound.firstName,
          time: new Date().getTime(),
        },
        process.env.SECRET
      );
      res.cookie("userLoggedIn", token, {
        maxAge: 7200000,
        httpOnly: true,
      });
      res.send({ user: "updated" });
    } catch (e) {
      console.log(e);
      res.send({ user: "failed" });
      res.end();
    }
  });
});

module.exports = router;
