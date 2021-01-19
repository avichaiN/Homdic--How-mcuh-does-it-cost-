const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jwt-simple");
// לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env
const secret = "temporary";

const checkUserToken = async (req, res, next) => {
  const token = req.cookies.userLoggedIn;
  if (token) {
    const decoded = jwt.decode(token, secret);
    req.userInfo = decoded;
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/", checkUserToken, async (req, res) => {
  try {
    const username = req.userInfo.username;
    const userFound = await User.findOne({ username: username });
    res.send({ userFound });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
