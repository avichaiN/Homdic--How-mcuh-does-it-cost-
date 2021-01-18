"use strict";

var express = require('express');

var Post = require('../models/post');

var router = express.Router();
var postsId = '';

var searcRegExp = function searcRegExp(searched) {
  return Post.find({
    $or: [{
      title: {
        $regex: searched,
        $options: ""
      }
    }, {
      desc: {
        $regex: searched,
        $options: ""
      }
    }]
  }).exec();
};

router.post('/', function _callee(req, res) {
  var searched, searchClean, searchRes;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          searched = req.body.searched;
          searchClean = searched.trim();
          postsId = '';
          _context.next = 5;
          return regeneratorRuntime.awrap(searcRegExp(searchClean));

        case 5:
          searchRes = _context.sent;
          searchRes.forEach(function (post) {
            postsId += "".concat(post._id, ",");
          });
          res.send({
            postsId: postsId
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});

var findPostById = function findPostById(id) {
  return Post.findById(id).exec();
};

router.use('/:id', function _callee2(req, res) {
  var foundPosts, splitedIDs, post;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          foundPosts = [];
          splitedIDs = req.params.id.split(',');
          splitedIDs.pop();
          i = 0;

        case 4:
          if (!(i < splitedIDs.length)) {
            _context2.next = 12;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(findPostById(splitedIDs[i]));

        case 7:
          post = _context2.sent;
          foundPosts.push(post);

        case 9:
          i++;
          _context2.next = 4;
          break;

        case 12:
          res.send({
            foundPosts: foundPosts
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;