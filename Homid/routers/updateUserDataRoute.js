const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jwt-simple");
const checkUserToken = require('../routers/checkUserToken');
// לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env
const secret = "temporary";


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
