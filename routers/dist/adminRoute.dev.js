"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user");

var cookieParser = require("cookie-parser");

var checkAdmin = require("../routers/gFunctions/checkAdmin");

require("dotenv").config();

router.use(cookieParser());

function getAllUsers() {
  return User.find().exec();
}

function getAllUsersLength() {
  var users;
  return regeneratorRuntime.async(function getAllUsersLength$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find().exec());

        case 2:
          users = _context.sent;
          return _context.abrupt("return", users.length);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function deleteUserById(id) {
  return User.findOneAndDelete({
    _id: id
  }).exec();
}

router.get("/", checkAdmin, function _callee(req, res) {
  var usersAmount, skip, allUsers;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getAllUsersLength());

        case 2:
          usersAmount = _context2.sent;
          console.log(usersAmount);
          skip = parseInt(req.params.skip);
          _context2.next = 7;
          return regeneratorRuntime.awrap(getAllUsers());

        case 7:
          allUsers = _context2.sent;
          res.send({
            allUsers: allUsers,
            admin: true,
            usersAmount: usersAmount
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get("/check", checkAdmin, function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.send({
            admin: true
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router["delete"]("/", checkAdmin, function _callee3(req, res) {
  var userId, deleteUser, allUsers;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = req.body.userId;
          _context4.next = 3;
          return regeneratorRuntime.awrap(deleteUserById(userId));

        case 3:
          deleteUser = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(getAllUsers());

        case 6:
          allUsers = _context4.sent;
          res.send({
            allUsers: allUsers
          });

        case 8:
        case "end":
          return _context4.stop();
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

  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, newEmail = _req$body.newEmail, newUsername = _req$body.newUsername, newfName = _req$body.newfName, newlName = _req$body.newlName, newRole = _req$body.newRole, id = _req$body.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(updateUser(newEmail, newUsername, newfName, newlName, newRole, id));

        case 3:
          update = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(getAllUsers());

        case 6:
          allUsers = _context5.sent;
          res.send({
            allUsers: allUsers,
            update: update
          });

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = [router];