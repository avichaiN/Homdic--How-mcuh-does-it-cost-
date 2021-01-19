const express = require("express");
const router = express.Router();
const User = require("../models/user");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/get-user-data", (req, res) => {
  try {
    const userCookie = req.body.cookie;
    console.log(userCookie);
  } catch (e) {
    console.log(e);
  }
});
