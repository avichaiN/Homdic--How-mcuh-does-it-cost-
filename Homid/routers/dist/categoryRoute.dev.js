"use strict";

var express = require("express");

var Category = require("../models/category");

var jwt = require("jwt-simple");

var cookieParser = require("cookie-parser");

<<<<<<< HEAD
var path = require('path'); // לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env
=======
var checkUserToken = require("../routers/authRoute"); // לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env
>>>>>>> master


var secret = "temporary";
var router = express.Router();
router.use(cookieParser());

var checkUserToken = function checkUserToken(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function checkUserToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.userLoggedIn;

          if (token) {
            decoded = jwt.decode(token, secret);
            req.userInfo = decoded;
            next();
          } else {
            console.log('er');
            res.sendFile(path.join(__dirname, '../public/index.html')); //   res.send({ user: "unauthorized" });
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

function checkAdmin(req, res, next) {
  var token = req.cookies.userLoggedIn;

  if (token) {
    var decoded = jwt.decode(token, secret);
    console.log(decoded.role);

    if (decoded.role === "admin") {
      next();
    } else {
      res.send({
        admin: false
      });
    }
  } else {
    res.send({
      admin: false
    });
  }
}

function categoriesFind() {
  return regeneratorRuntime.async(function categoriesFind$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          return _context2.abrupt("return", Category.find({}).exec());

        case 4:
          _context2.prev = 4;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 4]]);
} // get all categories to display on category page.


router.get("/", checkUserToken, function _callee(req, res) {
  var categories;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log('123');
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(categoriesFind());

        case 4:
          categories = _context3.sent;

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

          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.send({
            ok: false
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //create new category for admin

router.post("/", checkAdmin, function _callee2(req, res) {
  var newCategoryName, newCategoryImg, category, categories;
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          newCategoryName = req.body.newCategoryName;
          newCategoryImg = req.body.newCategoryImg;
          console.log(newCategoryName);
          console.log(newCategoryImg);
          category = new Category({
            Name: newCategoryName,
            Img: newCategoryImg
          });
          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(category.save());

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(categoriesFind());

        case 10:
          categories = _context4.sent;
          res.send({
            ok: true,
            category: category,
            categories: categories
          });
          _context4.next = 18;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](5);
          console.log(_context4.t0);
          res.send({
            ok: false
          });

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 14]]);
});
router.put("/", checkAdmin, function _callee4(req, res) {
  var _req$body, categoryId, newCategoryName, newCategoryImg;

  return regeneratorRuntime.async(function _callee4$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body = req.body, categoryId = _req$body.categoryId, newCategoryName = _req$body.newCategoryName, newCategoryImg = _req$body.newCategoryImg;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Category.findOneAndUpdate({
            _id: categoryId
          }, {
            Img: newCategoryImg,
            Name: newCategoryName
          }, function _callee3(err, category) {
            var categories;
            return regeneratorRuntime.async(function _callee3$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!err) {
                      _context5.next = 5;
                      break;
                    }

                    console.log(err);
                    res.send({
                      ok: false
                    });
                    _context5.next = 10;
                    break;

                  case 5:
                    _context5.next = 7;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 7:
                    categories = _context5.sent;
                    console.log(categories);
                    res.send({
                      ok: true,
                      category: category,
                      categories: categories
                    });

                  case 10:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          }));

        case 4:
          _context6.next = 9;
          break;

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](1);
          console.log(_context6.t0);

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 6]]);
});
router["delete"]("/", checkAdmin, function _callee6(req, res) {
  var chosenCategoryid;
  return regeneratorRuntime.async(function _callee6$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          chosenCategoryid = req.body.chosenCategoryid;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Category.findOneAndRemove({
            _id: chosenCategoryid
          }, function _callee5(err, category) {
            var categories;
            return regeneratorRuntime.async(function _callee5$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!err) {
                      _context7.next = 4;
                      break;
                    }

                    res.send({
                      ok: false
                    });
                    _context7.next = 9;
                    break;

                  case 4:
                    _context7.next = 6;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 6:
                    categories = _context7.sent;
                    console.log(categories);
                    res.send({
                      ok: true,
                      category: category,
                      categories: categories
                    });

                  case 9:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          }));

        case 4:
          _context8.next = 10;
          break;

        case 6:
          _context8.prev = 6;
          _context8.t0 = _context8["catch"](1);
          console.log(_context8.t0);
          res.send({
            ok: false
          });

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 6]]);
});
module.exports = router;