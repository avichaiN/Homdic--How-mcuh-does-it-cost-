"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user");

var cookieParser = require("cookie-parser");

router.use(cookieParser());
router.get("/get-user-data", function (req, res) {
  try {
    var userCookie = req.body.cookie;
    console.log(userCookie);
  } catch (e) {
    console.log(e);
  }
});