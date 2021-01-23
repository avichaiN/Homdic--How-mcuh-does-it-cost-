"use strict";

var express = require("express");

var router = express.Router();

var comments = require("../models/comments");

var checkUserToken = require("./gFunctions/checkUserToken");

var path = require('path');

router.get('/:id', checkUserToken, function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.sendFile(path.join(__dirname, "../public", "comments.html"));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/get/:id', checkUserToken, function _callee2(req, res) {
  var foundCommentsByPostId;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          chosenPostId = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(comments.aggregate([{
            $match: {
              postId: chosenPostId
            }
          }]));

        case 3:
          foundCommentsByPostId = _context2.sent;
          res.send({
            foundCommentsByPostId: foundCommentsByPostId
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post("/", checkUserToken, function _callee3(req, res) {
  var _req$body, userId, userFname, userLname, postId, desc, price, publishedBy, post;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, userFname = _req$body.userFname, userLname = _req$body.userLname, postId = _req$body.postId, desc = _req$body.desc, price = _req$body.price, publishedBy = _req$body.publishedBy;
          post = new Post({
            desc: desc,
            price: price,
            postId: postId,
            fName: userFname,
            lName: userLname,
            publishedBy: userId
          });
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(comments.save());

        case 5:
          res.send({
            posted: true,
            post: post
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](2);
          console.log(_context3.t0.message);
          res.send({
            posted: false
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 8]]);
});