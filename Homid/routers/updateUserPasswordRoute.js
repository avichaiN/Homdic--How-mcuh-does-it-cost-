const express = require("express");
const jwt = require("jwt-simple");
const router = express.Router();
const path = require("path");
const saltRounds = process.env.SALT;
require("dotenv").config();
const User = require("../models/user");

router.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "updateUserPassword.html"));
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const userFound = await User.findOne({ _id: userId });
  res.send({ user: userFound.firstName });
});

router.post("/", (req, res) => {
  const newPassword = req.body.newPassword;
  bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
    try {
      newUser.password = hash;
      await newUser.save();
      const token = jwt.encode(
        {
          role: newUser.role,
          username: newUser.username,
          name: newUser.firstName,
          time: new Date().getTime(),
        },
        process.env.SECRET
      );
      res.cookie("userLoggedIn", token, {
        maxAge: 7200000,
        httpOnly: true,
      });
      res.send({ status: "authorized" });
    } catch (e) {
      console.log(e);
      res.send({ status: "unauthorized" });
      res.end();
    }
  });
});

module.exports = router;
