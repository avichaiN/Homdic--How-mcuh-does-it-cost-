const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const jwt = require("jwt-simple");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

router.get("/", (req, res) => {
  res.sendFile("index.html");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });
    const match = await bcrypt.compare(password, userFound.password);
    if (match) {
      var token = jwt.encode(userFound.role, (date = new Date()), secret);
      res.cookie("userLoggedIn", token, { maxAge: 7200000, httpOnly: true });
      res.send({ status: "authorized" });
    }
  } catch (e) {
    console.log(e);
    res.send({ status: "unauthorized" });
    res.end();
  }
});

router.post("/register", (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const newUser = new User({
    email: email,
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
  });

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    try {
      newUser.password = hash;
      await newUser.save();
      res.send({ status: "authorized" });
    } catch (e) {
      console.log(e);
      res.send({ status: "unauthorized" });
      res.end();
    }
  });
});
module.exports = router;
