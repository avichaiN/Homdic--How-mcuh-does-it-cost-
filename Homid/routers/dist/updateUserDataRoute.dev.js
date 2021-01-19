"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user");

var jwt = require("jwt-simple");

var checkUserToken = require("../routers/checkUserToken"); // לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env


var secret = "temporary";
router.get("/", checkUserToken, function _callee(req, res) {
  var username, userFound;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          username = req.userInfo.username;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 4:
          userFound = _context.sent;
          res.send({
            userFound: userFound
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;