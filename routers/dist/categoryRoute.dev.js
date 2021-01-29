"use strict";

var express = require("express");

var Category = require("../models/category");

var jwt = require("jwt-simple");

var cookieParser = require("cookie-parser");

var checkUserToken = require("../routers/gFunctions/checkUserToken");

var checkAdmin = require("../routers/gFunctions/checkAdmin");

var path = require("path");

var router = express.Router();
router.use(cookieParser());

var categoriesFind = function categoriesFind() {
  return regeneratorRuntime.async(function categoriesFind$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.abrupt("return", Category.find({}).exec());

        case 4:
          _context.prev = 4;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 4]]);
}; // get all categories to display on category page.


router.get("/", checkUserToken, function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "Categories.html"));
});
router.get("/get", checkUserToken, function _callee(req, res) {
  var categories;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(categoriesFind());

        case 3:
          categories = _context2.sent;

          if (categories === false || categories === undefined) {
            res.send({
              ok: false
            });
          } else {
            res.send({
              ok: true,
              categories: categories
            });
          }

          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.send({
            ok: false
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //create new category for admin

router.post("/", checkAdmin, function _callee2(req, res) {
  var newCategoryName, newCategoryImg, category, categories;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          newCategoryName = req.body.newCategoryName;
          newCategoryImg = req.body.newCategoryImg;
          category = new Category({
            Name: newCategoryName,
            Img: newCategoryImg
          });
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(category.save());

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(categoriesFind());

        case 8:
          categories = _context3.sent;
          res.send({
            ok: true,
            category: category,
            categories: categories
          });
          _context3.next = 16;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](3);
          console.log(_context3.t0);
          res.send({
            ok: false
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 12]]);
});
router.put("/", checkAdmin, function _callee4(req, res) {
  var _req$body, categoryId, newCategoryName, newCategoryImg;

  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body = req.body, categoryId = _req$body.categoryId, newCategoryName = _req$body.newCategoryName, newCategoryImg = _req$body.newCategoryImg;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Category.findOneAndUpdate({
            _id: categoryId
          }, {
            Img: newCategoryImg,
            Name: newCategoryName
          }, function _callee3(err, category) {
            var categories;
            return regeneratorRuntime.async(function _callee3$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!err) {
                      _context4.next = 5;
                      break;
                    }

                    console.log(err);
                    res.send({
                      ok: false
                    });
                    _context4.next = 9;
                    break;

                  case 5:
                    _context4.next = 7;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 7:
                    categories = _context4.sent;
                    res.send({
                      ok: true,
                      category: category,
                      categories: categories
                    });

                  case 9:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }));

        case 4:
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 6]]);
});
router["delete"]("/", checkAdmin, function _callee6(req, res) {
  var chosenCategoryid;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          chosenCategoryid = req.body.chosenCategoryid;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Category.findOneAndRemove({
            _id: chosenCategoryid
          }, function _callee5(err, category) {
            var categories;
            return regeneratorRuntime.async(function _callee5$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!err) {
                      _context6.next = 4;
                      break;
                    }

                    res.send({
                      ok: false
                    });
                    _context6.next = 8;
                    break;

                  case 4:
                    _context6.next = 6;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 6:
                    categories = _context6.sent;
                    res.send({
                      ok: true,
                      category: category,
                      categories: categories
                    });

                  case 8:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          }));

        case 4:
          _context7.next = 10;
          break;

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](1);
          console.log(_context7.t0);
          res.send({
            ok: false
          });

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 6]]);
});

var getCategoryInfo = function getCategoryInfo(id) {
  try {
    return Category.find({
      _id: id
    }).exec();
  } catch (error) {
    console.log(error);
  }
};

router.post('/byid', function _callee7(req, res) {
  var categoryId, categoryInfo;
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          categoryId = req.body.categoryId;
          _context8.next = 3;
          return regeneratorRuntime.awrap(getCategoryInfo(categoryId));

        case 3:
          categoryInfo = _context8.sent;
          res.send({
            categoryInfo: categoryInfo
          });

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
});
module.exports = [router];