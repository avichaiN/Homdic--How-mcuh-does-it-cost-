"use strict";

var express = require("express");

var jwt = require("jwt-simple");

var router = express.Router();

var User = require("../models/user");

var checkUserToken = require("../routers/checkUserToken");

router.get("/", checkUserToken, function _callee(req, res) {
  var userCookie, decoded, userFound;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userCookie = req.cookies.userLoggedIn;
          decoded = jwt.decode(userCookie, process.env.SECRET);
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            _id: decoded.id
          }));

        case 5:
          userFound = _context.sent;
          res.send({
            userFound: userFound
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.post("/", checkUserToken, function _callee2(req, res) {
  var _req$body, firstName, lastName, username, email, userCookie, decoded, updatedUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, username = _req$body.username, email = _req$body.email;
          userCookie = req.cookies.userLoggedIn;
          decoded = jwt.decode(userCookie, process.env.SECRET);
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: decoded.id
          }, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email
          }));

        case 6:
          updatedUser = _context2.sent;
          res.send({
            user: "updated"
          });
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 10]]);
});
module.exports = router;