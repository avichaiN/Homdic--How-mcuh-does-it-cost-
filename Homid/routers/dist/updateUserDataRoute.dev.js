"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user");

var jwt = require("jwt-simple"); // לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env


var secret = "temporary";

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
            res.redirect("/");
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

router.get("/", checkUserToken, function _callee(req, res) {
  var username, userFound;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          username = req.userInfo.username;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 4:
          userFound = _context2.sent;
          res.send({
            userFound: userFound
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;