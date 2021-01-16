"use strict";

var express = require('express');

var Category = require('../models/category');

var router = express.Router(); // get all categories to display on category page.

router.get('/', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Category.find({}, function (err, categories) {
            if (err) {
              res.send({
                ok: false
              });
            } else {
              res.send({
                categories: categories
              });
            }
          }));

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          res.send({
            ok: false
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
}); //create new category for admin

router.post('/create', function _callee2(req, res) {
  var newCategory, category;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          newCategory = req.body.newCategory;
          console.log(newCategory);
          category = new Category({
            Name: newCategory
          });
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(category.save());

        case 6:
          res.send({
            ok: true
          });
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](3);
          console.log(_context2.t0);
          res.send({
            ok: false
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 9]]);
});
module.exports = router;