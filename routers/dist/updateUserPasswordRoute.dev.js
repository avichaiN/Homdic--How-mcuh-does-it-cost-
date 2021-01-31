"use strict";

var express = require("express");

var jwt = require("jwt-simple");

var router = express.Router();

var path = require("path");

var bcrypt = require("bcrypt");

var saltRounds = 12;

require("dotenv").config();

var User = require("../models/user");

router.post("/", function (req, res) {
  var newPassword = req.body.newPassword;
  bcrypt.hash(newPassword, saltRounds, function _callee(err, hash) {
    var encodedId, decodedId, userFound, token;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            newPassword = hash;
            encodedId = req.headers.referer.replace("http://localhost:3000/updateUserPassword.html?", ""); //console.log(encodedId);

            decodedId = jwt.decode(encodedId, process.env.SECRET);
            _context.next = 6;
            return regeneratorRuntime.awrap(User.findOneAndUpdate({
              _id: decodedId
            }, {
              password: hash
            }));

          case 6:
            userFound = _context.sent;
            token = jwt.encode({
              role: userFound.role,
              username: userFound.username,
              name: userFound.firstName,
              time: new Date().getTime()
            }, process.env.SECRET);
            res.cookie("userLoggedIn", token, {
              maxAge: 7200000,
              httpOnly: true
            });
            res.send({
              user: "updated"
            });
            _context.next = 17;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.send({
              user: "failed"
            });
            res.end();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 12]]);
  });
});
router.post("/getusername", function _callee2(req, res) {
  var encodedId, decodedId, userFound;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          encodedId = req.body.encodedId;
          decodedId = jwt.decode(encodedId, process.env.SECRET);
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            _id: decodedId
          }));

        case 5:
          userFound = _context2.sent;
          res.send({
            user: userFound.firstName
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