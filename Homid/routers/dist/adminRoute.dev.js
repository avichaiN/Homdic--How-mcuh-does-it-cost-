"use strict";

var express = require('express');

var router = express.Router();

var User = require('../models/user');

var jwt = require("jwt-simple");

var cookieParser = require("cookie-parser"); // לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env


var secret = "temporary";
router.use(cookieParser());

function checkAdmin(req, res, next) {
  var token = req.cookies.userLoggedIn;

  if (token) {
    var decoded = jwt.decode(token, secret);
    console.log(decoded.role);

    if (decoded.role === 'admin') {
      next();
    } else {
      res.send({
        admin: false
      });
    }
  } else {
    res.send({
      admin: false
    });
  }
}

function getAllUsers() {
  return User.find().exec();
}

function deleteUserById(id) {
  return User.findOneAndDelete({
    _id: id
  }).exec();
}

router.get("/", checkAdmin, function _callee(req, res) {
  var allUsers;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getAllUsers());

        case 2:
          allUsers = _context.sent;
          res.send({
            allUsers: allUsers,
            admin: true
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/check", checkAdmin, function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.send({
            admin: true
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router["delete"]("/", checkAdmin, function _callee3(req, res) {
  var userId, deleteUser, allUsers;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.body.userId;
          _context3.next = 3;
          return regeneratorRuntime.awrap(deleteUserById(userId));

        case 3:
          deleteUser = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(getAllUsers());

        case 6:
          allUsers = _context3.sent;
          res.send({
            allUsers: allUsers
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});

function updateUser(newEmail, newUsername, newfName, newlName, newRole, id) {
  return User.findByIdAndUpdate(id, {
    username: newUsername,
    email: newEmail,
    firstName: newfName,
    lastName: newlName,
    role: newRole
  }).exec();
}

router.put("/", checkAdmin, function _callee4(req, res) {
  var _req$body, newEmail, newUsername, newfName, newlName, newRole, id, update, allUsers;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, newEmail = _req$body.newEmail, newUsername = _req$body.newUsername, newfName = _req$body.newfName, newlName = _req$body.newlName, newRole = _req$body.newRole, id = _req$body.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(updateUser(newEmail, newUsername, newfName, newlName, newRole, id));

        case 3:
          update = _context4.sent;
          console.log(update);
          _context4.next = 7;
          return regeneratorRuntime.awrap(getAllUsers());

        case 7:
          allUsers = _context4.sent;
          res.send({
            allUsers: allUsers,
            update: update
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;