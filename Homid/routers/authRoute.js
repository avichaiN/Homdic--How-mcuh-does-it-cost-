const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const jwt = require("jwt-simple");
const cookieParser = require("cookie-parser");
// לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env
const secret = "temporary";

router.use(cookieParser());

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    hash = userFound.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        const token = jwt.encode(
          {
            role: userFound.role,
            username: userFound.username,
            name: userFound.firstName,
            date: new Date(),
          },
          secret
        );
        res.cookie("userLoggedIn", token, {
          maxAge: 7200000,
          httpOnly: true,
        });
        res.send({ status: "authorized" });
      } else {
        res.send({ status: "unauthorized" });
        res.end();
      }
    });
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
      const token = jwt.encode(
        {
          role: newUser.role,
          username: newUser.username,
          name: newUser.firstName,
          date: new Date(),
        },
        secret
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

// check if user logged in

router.get("/logout", (req, res) => {
  res.cookie("userLoggedIn", "", { expires: new Date(0) }); // this delete cookie (sets it to a date that is gone)

  res.send({ loggedout: true });
});
module.exports = router;
