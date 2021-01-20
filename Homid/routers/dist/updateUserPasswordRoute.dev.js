"use strict";

var express = require("express");

var jwt = require("jwt-simple");

var router = express.Router();

var path = require("path");

var saltRounds = process.env.SALT;

require("dotenv").config();

var User = require("../models/user");

router.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.sendFile(path.join(__dirname, "../public", "updateUserPassword.html"));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/:id", function _callee2(req, res) {
  var userId, userFound;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            _id: userId
          }));

        case 3:
          userFound = _context2.sent;
          res.send({
            user: userFound.firstName
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post("/", function (req, res) {
  var newPassword = req.body.newPassword;
  bcrypt.hash(newPassword, saltRounds, function _callee3(err, hash) {
    var token;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            newUser.password = hash;
            _context3.next = 4;
            return regeneratorRuntime.awrap(newUser.save());

          case 4:
            token = jwt.encode({
              role: newUser.role,
              username: newUser.username,
              name: newUser.firstName,
              time: new Date().getTime()
            }, process.env.SECRET);
            res.cookie("userLoggedIn", token, {
              maxAge: 7200000,
              httpOnly: true
            });
            res.send({
              status: "authorized"
            });
            _context3.next = 14;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.send({
              status: "unauthorized"
            });
            res.end();

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 9]]);
  });
});
module.exports = router;