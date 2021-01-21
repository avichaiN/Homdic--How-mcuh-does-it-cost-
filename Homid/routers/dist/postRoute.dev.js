"use strict";

var express = require("express");

var router = express.Router();

var Post = require("../models/post");

var checkUserToken = require("./gFunctions/checkUserToken");

router.post("/", checkUserToken, function _callee(req, res) {
  var _req$body, user, categoryId, title, desc, img, post;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, user = _req$body.user, categoryId = _req$body.categoryId, title = _req$body.title, desc = _req$body.desc, img = _req$body.img;
          post = new Post({
            title: title,
            desc: desc,
            img: img,
            categoryId: categoryId,
            publishedBy: user
          });
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(post.save());

        case 5:
          res.send({
            posted: true,
            post: post
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0.message);
          res.send({
            posted: false
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 8]]);
});
module.exports = [router];