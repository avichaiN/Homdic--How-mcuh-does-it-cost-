const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/get-user-data", async (req, res) => {
  try {
    const userCookie = req.body.cookie;
    console.log(userCookie);
  } catch (e) {}
});
