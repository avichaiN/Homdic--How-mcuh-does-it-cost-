"use strict";

var User = require("../s-models/user");

var Post = require("../s-models/post");

var Comment = require("../s-models/comment");

require("dotenv").config();

exports.getAllUsers = function _callee(req, res) {
  var usersAmount, allUsers;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getAllUsersLength());

        case 3:
          usersAmount = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(getAllUsers());

        case 6:
          allUsers = _context.sent;
          res.send({
            allUsers: allUsers,
            admin: true,
            usersAmount: usersAmount
          });
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(e.message);
          res.status(404).send({
            status: "unauthorized"
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.deleteUser = function _callee2(req, res) {
  var userId, allUsers;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.body.userId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(deleteUserPosts(userId));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(deleteUserComments(userId));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(deleteUserLikes(userId));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(deleteUserById(userId));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(getAllUsers());

        case 12:
          allUsers = _context2.sent;
          res.send({
            allUsers: allUsers
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
          res.status(404).send({
            status: "unauthorized"
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.editUser = function _callee3(req, res) {
  var _req$body, newEmail, newUsername, newfName, newlName, newRole, id, update, allUsers;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, newEmail = _req$body.newEmail, newUsername = _req$body.newUsername, newfName = _req$body.newfName, newlName = _req$body.newlName, newRole = _req$body.newRole, id = _req$body.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(updateUser(newEmail, newUsername, newfName, newlName, newRole, id));

        case 4:
          update = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(getAllUsers());

        case 7:
          allUsers = _context3.sent;
          res.send({
            allUsers: allUsers,
            update: update
          });
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log(e.message);
          res.status(404).send({
            status: "unauthorized"
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.checkAdminF = function (req, res) {
  try {
    res.send({
      admin: true
    });
  } catch (err) {
    console.log(e.message);
    res.status(404).send({
      status: "unauthorized"
    });
  }
};

var deleteUserPosts = function deleteUserPosts(userId) {
  return Post.deleteMany({
    publishedBy: userId
  }).exec();
};

var deleteUserComments = function deleteUserComments(userId) {
  return Comment.deleteMany({
    publishedBy: userId
  }).exec();
};

var deleteUserLikes = function deleteUserLikes(userId) {
  var comments, commentsWhichLiked;
  return regeneratorRuntime.async(function deleteUserLikes$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Comment.find({}));

        case 2:
          comments = _context5.sent;
          commentsWhichLiked = [];
          comments.forEach(function (comment) {
            if (comment.likes.includes(userId)) {
              commentsWhichLiked.push(comment._id);
            }
          });
          commentsWhichLiked.forEach(function _callee4(commentId) {
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(Comment.findOneAndUpdate({
                      _id: commentId
                    }, {
                      $pull: {
                        likes: userId
                      }
                    }).exec());

                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
};

function getAllUsersLength() {
  var users;
  return regeneratorRuntime.async(function getAllUsersLength$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.find().exec());

        case 2:
          users = _context6.sent;
          return _context6.abrupt("return", users.length);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function getAllUsers() {
  return User.find().exec();
}

function deleteUserById(id) {
  return User.findOneAndDelete({
    _id: id
  }).exec();
}

function updateUser(newEmail, newUsername, newfName, newlName, newRole, id) {
  return User.findByIdAndUpdate(id, {
    username: newUsername,
    email: newEmail,
    firstName: newfName,
    lastName: newlName,
    role: newRole
  }).exec();
}