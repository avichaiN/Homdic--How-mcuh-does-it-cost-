const express = require("express");
const router = express.Router();
const User = require("../models/user");
const checkUserToken = require("../routers/checkUserToken");

router.get("/", checkUserToken, async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const userFound = await User.findOne({ _id: userId });
    res.send({ userFound });
  } catch (e) {
    console.log(e);
  }
});

router.post("/", checkUserToken, async (req, res) => {
  const { firstName, lastName, username, email } = req.body;
  const userId = req.userInfo.id;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
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
