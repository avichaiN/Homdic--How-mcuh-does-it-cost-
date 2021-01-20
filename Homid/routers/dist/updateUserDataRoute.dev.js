"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user");

var checkUserToken = require("../routers/checkUserToken");

router.get("/", checkUserToken, function _callee(req, res) {
  var userId, userFound;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.userInfo.id;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            _id: userId
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
router.post("/", checkUserToken, function _callee2(req, res) {
  var _req$body, firstName, lastName, username, email, userId, updatedUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, username = _req$body.username, email = _req$body.email;
          userId = req.userInfo.id;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            _id: userId
          }, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email
          }));

        case 5:
          updatedUser = _context2.sent;
          res.send({
            user: "updated"
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          console.log(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
module.exports = router;