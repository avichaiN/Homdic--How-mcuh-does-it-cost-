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
            res.redirect("/");
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

router.get("/", checkUserToken, function (req, res) {
  res.sendFile("index.html");
});
router.post("/", function _callee(req, res) {
  var _req$body, username, password, userFound;

  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            $or: [{
              username: username
            }, {
              email: username
            }]
          }));

        case 4:
          userFound = _context2.sent;
          hash = userFound.password;
          bcrypt.compare(password, hash, function (err, result) {
            if (result) {
              var token = jwt.encode({
                role: userFound.role,
                username: userFound.username,
                name: userFound.firstName,
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
          });
          _context2.next = 14;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          res.send({
            status: "unauthorized"
          });
          res.end();

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
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
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            newUser.password = hash;
            _context3.next = 4;
            return regeneratorRuntime.awrap(newUser.save());

          case 4:
            res.send({
              status: "authorized"
            });
            _context3.next = 12;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.send({
              status: "unauthorized"
            });
            res.end();

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  });
}); // check if user logged in

router.get("/logout", checkUserToken, function (req, res) {
  res.cookie("userLoggedIn", "", {
    expires: new Date(0)
  }); // this delete cookie (sets it to a date that is gone)

  res.send({
    loggedout: true
  });
});
module.exports = router;