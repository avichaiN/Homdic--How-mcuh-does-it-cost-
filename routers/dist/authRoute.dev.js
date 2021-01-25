"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user");

var bcrypt = require("bcrypt");

var jwt = require("jwt-simple");

var saltRounds = 12;

var cookieParser = require("cookie-parser");

var path = require("path");

var nodemailer = require("nodemailer");

router.use(cookieParser());
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
          hash = userFound.password;
          bcrypt.compare(password, hash, function (err, result) {
            if (result) {
              var token = jwt.encode({
                id: userFound._id,
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
                status: "authorized"
              });
            } else {
              res.send({
                status: "unauthorized"
              });
              res.end();
            }
          });
          _context.next = 14;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.send({
            status: "unauthorized"
          });
          res.end();

        case 14:
        case "end":
          return _context.stop();
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
  bcrypt.hash(newUser.password, saltRounds, function _callee2(err, hash) {
    var token;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newUser.password = hash;
            _context2.next = 4;
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
            _context2.next = 14;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0.message);
            res.send({
              status: "unauthorized"
            });
            res.end();

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  });
});
router.get("/userInfo", function (req, res) {
  var token = req.cookies.userLoggedIn;

  if (token) {
    var decoded = jwt.decode(token, process.env.SECRET);
    res.send({
      decoded: decoded
    });
  } else {
    res.send({
      ok: false
    });
  }
});
router.get("/logout", function (req, res) {
  res.cookie("userLoggedIn", "", {
    expires: new Date(0)
  }); // this delete cookie (sets it to a date that is gone)

  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
router.get("/logout/user", function (req, res) {
  res.cookie("userLoggedIn", "", {
    expires: new Date(0)
  }); // this delete cookie (sets it to a date that is gone)

  res.send({
    loggedout: true
  });
});
router.post("/reset", function _callee3(req, res) {
  var userEmail, userFound, userId, encodedId, tranporter, mailOptions;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userEmail = req.body.userEmail;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: userEmail
          }));

        case 4:
          userFound = _context3.sent;

          if (userFound) {
            userId = userFound._id;
            encodedId = jwt.encode(userId, process.env.SECRET);
            console.log(encodedId);
            tranporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD
              }
            });
            mailOptions = {
              from: "Homedic Support",
              to: "".concat(userEmail),
              subject: "Reset your password at Homedic",
              html: "<p>Hey there!,\n        We heard that you forgot your password, Click on the link below to reset your password and enjoy Homedic!.</p><br>http://localhost:3000/updateUserPassword.html?".concat(encodedId, " ")
            };
            tranporter.sendMail(mailOptions, function (e, info) {
              if (e) {
                console.log(e);
                res.send({
                  email: "failed"
                });
              } else {
                res.send({
                  email: "success"
                });
              }
            });
          } else {
            res.send({
              email: "failed"
            });
          }

          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = [router];