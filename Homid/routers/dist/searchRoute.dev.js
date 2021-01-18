"use strict";

var express = require('express');

var Post = require('../models/post');

var router = express.Router();
router.post('/', function _callee(req, res) {
  var searched, searchClean;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          searched = req.body.searched;
          searchClean = searched.trim();
          res.send({
            searchClean: searchClean
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});

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

router.use('/:keywords', function _callee2(req, res) {
  var searched, posts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          searched = req.params.keywords;
          _context2.next = 3;
          return regeneratorRuntime.awrap(searcRegExp(searched));

        case 3:
          posts = _context2.sent;

          if (posts.length === 0) {
            res.send({
              ok: false
            });
          } else {
            res.send({
              posts: posts,
              ok: true
            });
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;