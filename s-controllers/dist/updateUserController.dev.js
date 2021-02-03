"use strict";

var jwt = require("jwt-simple");

var User = require("../s-models/user");

var bcrypt = require("bcrypt");

var saltRounds = 12;

require("dotenv").config();

exports.getUserInfo = function _callee(req, res) {
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

exports.editUser = function _callee2(req, res) {
  var _req$body, firstName, lastName, username, email, userCookie, decoded, updatedUser, userFound, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, username = _req$body.username, email = _req$body.email;
          userCookie = req.cookies.userLoggedIn;
          decoded = jwt.decode(userCookie, process.env.SECRET);
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
          _context2.next = 9;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 9:
          userFound = _context2.sent;
          token = jwt.encode({
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
            user: "updated"
          });
          _context2.next = 19;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.sendEmail = function _callee4(req, res) {
  var newPassword;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          newPassword = req.body.newPassword;
          bcrypt.hash(newPassword, saltRounds, function _callee3(err, hash) {
            var encodedId, decodedId, userFound, token;
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    newPassword = hash;
                    encodedId = req.headers.referer.replace("http://localhost:3000/updateUserPassword.html?", "");
                    decodedId = jwt.decode(encodedId, process.env.SECRET);
                    _context3.next = 6;
                    return regeneratorRuntime.awrap(User.findOneAndUpdate({
                      _id: decodedId
                    }, {
                      password: hash
                    }));

                  case 6:
                    userFound = _context3.sent;
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
                    _context3.next = 17;
                    break;

                  case 12:
                    _context3.prev = 12;
                    _context3.t0 = _context3["catch"](0);
                    console.log(_context3.t0);
                    res.send({
                      user: "failed"
                    });
                    res.end();

                  case 17:
                  case "end":
                    return _context3.stop();
                }
              }
            }, null, null, [[0, 12]]);
          });

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getUserName = function _callee5(req, res) {
  var encodedId, decodedId, userFound;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          encodedId = req.body.encodedId;
          decodedId = jwt.decode(encodedId, process.env.SECRET);
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            _id: decodedId
          }));

        case 5:
          userFound = _context5.sent;
          res.send({
            user: userFound.firstName
          });
          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};