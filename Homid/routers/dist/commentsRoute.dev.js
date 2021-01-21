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
          res.sendFile(path.join(__dirname, "../public", "posts.html"));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});