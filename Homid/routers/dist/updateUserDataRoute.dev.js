"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user");

router.get("/get-user-data", function _callee(req, res) {
  var userCookie;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            userCookie = req.body.cookie;
            console.log(userCookie);
          } catch (e) {}

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});