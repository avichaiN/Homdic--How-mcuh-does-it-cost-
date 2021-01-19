"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user");

var bcrypt = require("bcrypt");

var saltRounds = 12;

var jwt = require("jwt-simple");

var cookieParser = require("cookie-parser"); // לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env


var secret = "temporary";
router.use(cookieParser());

var checkUserToken = function checkUserToken(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function checkUserToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.userLoggedIn;

          if (token) {
            decoded = jwt.decode(token, secret);
            req.userInfo = decoded;
            next();
          } else {
            res.send({
              user: "unauthorized"
            });
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = router;