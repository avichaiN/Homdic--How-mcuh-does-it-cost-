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
  var newCategoryName, newCategoryImg, category;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          newCategoryName = req.body.newCategoryName;
          newCategoryImg = req.body.newCategoryImg;
          console.log(newCategory);
          category = new Category({
            Name: newCategory,
            img: newCategoryImg
          });
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(category.save());

        case 7:
          res.send({
            ok: true
          });
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](4);
          console.log(_context2.t0);
          res.send({
            ok: false
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 10]]);
});
module.exports = router;