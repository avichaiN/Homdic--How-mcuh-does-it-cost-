"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user");

var bcrypt = require("bcrypt");

var saltRounds = 12;

var jwt = require("jwt-simple");

var cookieParser = require("cookie-parser"); // לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env

<<<<<<< HEAD

var secret = "temporary";
=======
var secret = 'dsanjhkdnaskjdnkjsan3';
>>>>>>> master
router.use(cookieParser());
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
<<<<<<< HEAD
          bcrypt.hash(userFound.password, saltRounds, function (err, hash) {
            bcrypt.compare(password, hash, function (err, result) {
              if (result) {
                var token = jwt.encode({
                  role: userFound.role,
                  date: new Date()
                }, secret);
                res.cookie("userLoggedIn", token, {
                  maxAge: 7200000,
                  httpOnly: true
                });
                res.send({
                  status: "authorized"
                });
              } else {
                res.send({
                  status: "unauthorized"
                });
                res.end();
              }
=======
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(password, userFound.password));

        case 7:
          match = _context.sent;

          if (match) {
            token = jwt.encode(userFound.role, secret);
            res.cookie("userLoggedIn", token, {
              maxAge: 7200000,
              httpOnly: true
            });
            res.send({
              status: "authorized"
>>>>>>> master
            });
          });
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
router.post("/register", function (req, res) {
  var _req$body2 = req.body,
      firstName = _req$body2.firstName,
      lastName = _req$body2.lastName,
      username = _req$body2.username,
      email = _req$body2.email,
      password = _req$body2.password;
  var newUser = new User({
    email: email,
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password
  });
  bcrypt.hash(password, saltRounds, function _callee2(err, hash) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newUser.password = hash;
            _context2.next = 4;
            return regeneratorRuntime.awrap(newUser.save());

          case 4:
            res.send({
              status: "authorized"
            });
            _context2.next = 12;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.send({
              status: "unauthorized"
            });
            res.end();

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
});
module.exports = router;