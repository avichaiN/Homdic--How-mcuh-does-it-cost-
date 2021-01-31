"use strict";

var express = require("express");

var mongoose = require("mongoose");

var Post = require("../models/post");

var User = require("../models/user");

var Comment = require("../models/comment");

var Category = require("../models/category");

var checkUserToken = require("../routers/gFunctions/checkUserToken");

var checkAdmin = require("../routers/gFunctions/checkAdmin");

var router = express.Router();

var multer = require("multer");

var sharp = require("sharp");

var cookieParser = require("cookie-parser");

router.use(cookieParser());

var path = require("path"); // get all categories to display on category page.


router.get("/", checkUserToken, function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "Categories.html"));
});
var uploadImg = multer({
  limits: {
    fileSize: 5000000 // 5 MB

  },
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("please upload image file"));
    }

    cb(undefined, true);
  }
});
router.get("/get", checkUserToken, function _callee(req, res) {
  var categories;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(categoriesFind());

        case 3:
          categories = _context.sent;

          if (categories === false || categories === undefined) {
            res.send({
              ok: false
            });
          } else {
            res.send({
              categories: categories
            });
          }

          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.send({
            ok: false
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});

var categoriesFind = function categoriesFind() {
  return regeneratorRuntime.async(function categoriesFind$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          return _context2.abrupt("return", Category.aggregate([{
            $match: {}
          }]));

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
}; //create new category for admin


router.post("/", checkAdmin, uploadImg.single("img"), function _callee2(req, res) {
  var newCategoryName, Buffer, category, categories;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          newCategoryName = req.body.newCategoryName;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).resize({
            width: 240,
            high: 240
          }).toBuffer());

        case 4:
          Buffer = _context3.sent;
          category = new Category({
            img: Buffer,
            Name: newCategoryName,
            createdAt: new Date(Date.now())
          });
          _context3.next = 8;
          return regeneratorRuntime.awrap(category.save());

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(categoriesFind());

        case 10:
          categories = _context3.sent;
          res.send({
            ok: true,
            categories: categories
          });
          _context3.next = 18;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
          res.send({
            ok: false
          });

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 14]]);
});
router.put("/", checkAdmin, uploadImg.single("img"), function _callee5(req, res) {
  var _req$body, categoryId, newCategoryName, newCategoryImg, Buffer;

  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body = req.body, categoryId = _req$body.categoryId, newCategoryName = _req$body.newCategoryName, newCategoryImg = _req$body.newCategoryImg;
          _context6.prev = 1;

          if (!req.file) {
            _context6.next = 10;
            break;
          }

          _context6.next = 5;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).resize({
            width: 240,
            high: 240
          }).toBuffer());

        case 5:
          Buffer = _context6.sent;
          _context6.next = 8;
          return regeneratorRuntime.awrap(Category.findOneAndUpdate({
            _id: categoryId
          }, {
            img: Buffer,
            Name: newCategoryName
          }, function _callee3(err, category) {
            var categories;
            return regeneratorRuntime.async(function _callee3$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!err) {
                      _context4.next = 4;
                      break;
                    }

                    // console.log(err);
                    res.send({
                      ok: false
                    });
                    _context4.next = 8;
                    break;

                  case 4:
                    _context4.next = 6;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 6:
                    categories = _context4.sent;
                    res.send({
                      ok: true,
                      category: category,
                      categories: categories
                    });

                  case 8:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }));

        case 8:
          _context6.next = 12;
          break;

        case 10:
          _context6.next = 12;
          return regeneratorRuntime.awrap(Category.findOneAndUpdate({
            _id: categoryId
          }, {
            Name: newCategoryName
          }, function _callee4(err, category) {
            var categories;
            return regeneratorRuntime.async(function _callee4$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!err) {
                      _context5.next = 4;
                      break;
                    }

                    // console.log(err);
                    res.send({
                      ok: false
                    });
                    _context5.next = 8;
                    break;

                  case 4:
                    _context5.next = 6;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 6:
                    categories = _context5.sent;
                    res.send({
                      ok: true,
                      category: category,
                      categories: categories
                    });

                  case 8:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          }));

        case 12:
          _context6.next = 17;
          break;

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](1);
          console.log(_context6.t0);

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 14]]);
});
router["delete"]("/", checkAdmin, function _callee7(req, res) {
  var chosenCategoryid;
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          chosenCategoryid = req.body.chosenCategoryid;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Category.findOneAndDelete({
            _id: chosenCategoryid
          }, function _callee6(err, category) {
            var deletePostCommentsFavorites, categories;
            return regeneratorRuntime.async(function _callee6$(_context7) {
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
                    _context7.next = 11;
                    break;

                  case 4:
                    _context7.next = 6;
                    return regeneratorRuntime.awrap(findPostsCategoryAndDelete(chosenCategoryid));

                  case 6:
                    deletePostCommentsFavorites = _context7.sent;
                    _context7.next = 9;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 9:
                    categories = _context7.sent;
                    res.send({
                      ok: true,
                      categories: categories
                    });

                  case 11:
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

var findPostsCategoryAndDelete = function findPostsCategoryAndDelete(categoryId) {
  return regeneratorRuntime.async(function findPostsCategoryAndDelete$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(Post.find({
            categoryId: categoryId
          }, function _callee9(err, posts) {
            return regeneratorRuntime.async(function _callee9$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    if (err) {} else {
                      posts.forEach(function _callee8(post) {
                        return regeneratorRuntime.async(function _callee8$(_context9) {
                          while (1) {
                            switch (_context9.prev = _context9.next) {
                              case 0:
                                _context9.next = 2;
                                return regeneratorRuntime.awrap(deleteFromFavorites(post._id));

                              case 2:
                                _context9.next = 4;
                                return regeneratorRuntime.awrap(deletePostComments(post._id));

                              case 4:
                                _context9.next = 6;
                                return regeneratorRuntime.awrap(deletePost(post._id));

                              case 6:
                              case "end":
                                return _context9.stop();
                            }
                          }
                        });
                      });
                    }

                  case 1:
                  case "end":
                    return _context10.stop();
                }
              }
            });
          }));

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  });
};

var deleteFromFavorites = function deleteFromFavorites(postId) {
  var userWhoFavorites;
  return regeneratorRuntime.async(function deleteFromFavorites$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(User.aggregate([{
            $match: {
              favPosts: "".concat(postId)
            }
          }]));

        case 2:
          userWhoFavorites = _context13.sent;
          userWhoFavorites.forEach(function _callee10(user) {
            return regeneratorRuntime.async(function _callee10$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.next = 2;
                    return regeneratorRuntime.awrap(deletePostFromFavorite(postId, user._id));

                  case 2:
                  case "end":
                    return _context12.stop();
                }
              }
            });
          });

        case 4:
        case "end":
          return _context13.stop();
      }
    }
  });
};

var deletePostFromFavorite = function deletePostFromFavorite(postID, userId) {
  return regeneratorRuntime.async(function deletePostFromFavorite$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          return _context14.abrupt("return", User.findOneAndUpdate({
            _id: userId
          }, {
            $pull: {
              favPosts: postID
            }
          }).exec());

        case 1:
        case "end":
          return _context14.stop();
      }
    }
  });
};

var deletePost = function deletePost(postId) {
  return regeneratorRuntime.async(function deletePost$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          return _context15.abrupt("return", Post.findOneAndDelete({
            _id: postId
          }).exec());

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
};

var deletePostComments = function deletePostComments(postId) {
  return regeneratorRuntime.async(function deletePostComments$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          return _context16.abrupt("return", Comment.deleteMany({
            postId: postId
          }).exec());

        case 1:
        case "end":
          return _context16.stop();
      }
    }
  });
};

var getCategoryInfo = function getCategoryInfo(id) {
  try {
    var ObjectId = mongoose.Types.ObjectId;
    return Category.aggregate([{
      $match: {
        _id: ObjectId("".concat(id))
      }
    }]);
  } catch (error) {
    console.log(error);
  }
};

router.post('/byid', function _callee11(req, res) {
  var categoryId, categoryInfo;
  return regeneratorRuntime.async(function _callee11$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          categoryId = req.body.categoryId;
          _context17.next = 3;
          return regeneratorRuntime.awrap(getCategoryInfo(categoryId));

        case 3:
          categoryInfo = _context17.sent;
          res.send({
            categoryInfo: categoryInfo
          });

        case 5:
        case "end":
          return _context17.stop();
      }
    }
  });
});
module.exports = [router];