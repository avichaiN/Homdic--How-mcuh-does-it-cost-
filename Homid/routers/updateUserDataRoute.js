const express = require("express");
const jwt = require("jwt-simple");
const router = express.Router();
const User = require("../models/user");
const checkUserToken = require("../routers/gFunctions/checkUserToken");

router.get("/", checkUserToken, async (req, res) => {
  try {
    const userCookie = req.cookies.userLoggedIn;
    const decoded = jwt.decode(userCookie, process.env.SECRET);
    const userFound = await User.findOne({ _id: decoded.id });
    res.send({ userFound });
  } catch (e) {
    console.log(e);
  }
});

router.post("/", checkUserToken, async (req, res) => {
  const { firstName, lastName, username, email } = req.body;
  const userCookie = req.cookies.userLoggedIn;
  const decoded = jwt.decode(userCookie, process.env.SECRET);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: decoded.id },
      {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
      }
    );
    res.send({ user: "updated" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
