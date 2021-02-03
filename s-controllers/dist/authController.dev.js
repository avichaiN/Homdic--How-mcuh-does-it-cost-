"use strict";

var User = require("../s-models/user");

var bcrypt = require("bcrypt");

var jwt = require("jwt-simple");

var saltRounds = 12;

var nodemailer = require("nodemailer");

require("dotenv").config();

exports.loginUser = function _callee(req, res) {
  var _req$body, username, password, userFound;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
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
                fName: userFound.firstName,
                lName: userFound.lastName,
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
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.registerUser = function _callee3(req, res) {
  var _req$body2, firstName, lastName, username, email, password, newUser;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password;
            newUser = new User({
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
                      newUser.password = hash;
                      _context2.next = 3;
                      return regeneratorRuntime.awrap(newUser.save());

                    case 3:
                      token = jwt.encode({
                        role: newUser.role,
                        username: newUser.username,
                        fName: newUser.firstName,
                        lName: newUser.lastName,
                        time: new Date().getTime(),
                        id: newUser._id
                      }, process.env.SECRET);
                      res.cookie("userLoggedIn", token, {
                        maxAge: 7200000,
                        httpOnly: true
                      });
                      res.send({
                        status: "authorized"
                      });

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
          } catch (e) {
            console.log(e.message);
            res.send({
              status: "unauthorized"
            });
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.logUserOut = function (req, res) {
  try {
    res.cookie("userLoggedIn", "", {
      expires: new Date(0)
    }); // this delete cookie (sets it to a date that is gone)

    res.send({
      loggedout: true
    });
  } catch (e) {
    console.log(e.message);
    res.send({
      status: "unauthorized"
    });
  }
};

exports.getUserInfo = function (req, res) {
  try {
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
  } catch (e) {
    console.log(e.message);
    res.send({
      status: "unauthorized"
    });
  }
};

exports.resetPassword = function _callee4(req, res) {
  var userEmail, userFound, userId, encodedId, tranporter, mailOptions;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userEmail = req.body.userEmail;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: userEmail
          }));

        case 4:
          userFound = _context4.sent;

          if (userFound) {
            userId = userFound._id;
            encodedId = jwt.encode(userId, process.env.SECRET);
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
              html: "<p>\u05D4\u05D9\u05D9 <br> \u05E9\u05DE\u05E2\u05E0\u05D5 \u05E9\u05E9\u05DB\u05D7\u05EA \u05D0\u05EA \u05D4\u05E1\u05D9\u05E1\u05DE\u05D0 \u05E9\u05DC\u05DA, \u05D0\u05DC \u05D3\u05D0\u05D2\u05D4! \u05E0\u05D0 \u05DC\u05D4\u05DB\u05E0\u05E1 \u05DC\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D4\u05DE\u05E6\u05D5\u05E8\u05E3 \u05DC\u05D0\u05D9\u05E4\u05D5\u05E1 , \u05E6\u05D5\u05D5\u05EA homdic</p><br>http://homdic.herokuapp.com/updateUserPassword.html?".concat(encodedId, " ")
            };
            tranporter.sendMail(mailOptions, function (e, info) {
              if (e) {
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

          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.checkUserCookie = function (req, res) {
  try {
    res.send({
      validCookie: true
    });
  } catch (e) {
    console.log(e.message);
    res.send({
      status: "unauthorized"
    });
  }
};