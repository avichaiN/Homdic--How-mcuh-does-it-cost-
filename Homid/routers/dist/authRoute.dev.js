"use strict";

var express = require('express');

var router = express.Router();

var User = require('../models/user');

router.get("/", function (req, res) {
  res.sendFile("index.html");
});
router.post("/", function _callee(req, res) {
  var _req$body, username, password, userFound;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            $or: [{
              username: username
            }, {
              email: username
            }]
          }));

        case 4:
          userFound = _context.sent;

          if (userFound.password == password) {
            res.send({
              status: "authorized"
            });
          }

          _context.next = 13;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.send({
            status: "unauthorized"
          });
          res.end();

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.get("/register", function (req, res) {
  res.sendFile("public/register.html", {
    root: __dirname
  });
});
router.post("/register", function _callee2(req, res) {
  var _req$body2, firstName, lastName, username, email, password, newUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password;
          newUser = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
          });
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(newUser.save());

        case 5:
          res.send({
            status: "authorized"
          });
          _context2.next = 13;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](2);
          console.log(_context2.t0);
          res.send({
            status: "unauthorized"
          });
          res.end();

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 8]]);
});
module.exports = router;