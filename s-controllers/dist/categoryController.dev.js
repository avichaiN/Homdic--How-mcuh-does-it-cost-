"use strict";

var mongoose = require("mongoose");

var Post = require("../s-models/post");

var User = require("../s-models/user");

var Comment = require("../s-models/comment");

var Category = require("../s-models/category");

var sharp = require("sharp");

var path = require("path");

var categoriesFind = function categoriesFind() {
  return regeneratorRuntime.async(function categoriesFind$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.abrupt("return", Category.aggregate([{
            $match: {}
          }]));

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
};

var findPostsCategoryAndDelete = function findPostsCategoryAndDelete(categoryId) {
  return regeneratorRuntime.async(function findPostsCategoryAndDelete$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Post.find({
            categoryId: categoryId
          }, function _callee2(err, posts) {
            return regeneratorRuntime.async(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (err) {} else {
                      posts.forEach(function _callee(post) {
                        return regeneratorRuntime.async(function _callee$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _context2.next = 2;
                                return regeneratorRuntime.awrap(deleteFromFavorites(post._id));

                              case 2:
                                _context2.next = 4;
                                return regeneratorRuntime.awrap(deletePostComments(post._id));

                              case 4:
                                _context2.next = 6;
                                return regeneratorRuntime.awrap(deletePost(post._id));

                              case 6:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        });
                      });
                    }

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var deleteFromFavorites = function deleteFromFavorites(postId) {
  var userWhoFavorites;
  return regeneratorRuntime.async(function deleteFromFavorites$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.aggregate([{
            $match: {
              favPosts: "".concat(postId)
            }
          }]));

        case 2:
          userWhoFavorites = _context6.sent;
          userWhoFavorites.forEach(function _callee3(user) {
            return regeneratorRuntime.async(function _callee3$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(deletePostFromFavorite(postId, user._id));

                  case 2:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var deletePostFromFavorite = function deletePostFromFavorite(postID, userId) {
  return regeneratorRuntime.async(function deletePostFromFavorite$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", User.findOneAndUpdate({
            _id: userId
          }, {
            $pull: {
              favPosts: postID
            }
          }).exec());

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var deletePost = function deletePost(postId) {
  return regeneratorRuntime.async(function deletePost$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", Post.findOneAndDelete({
            _id: postId
          }).exec());

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
};

var deletePostComments = function deletePostComments(postId) {
  return regeneratorRuntime.async(function deletePostComments$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", Comment.deleteMany({
            postId: postId
          }).exec());

        case 1:
        case "end":
          return _context9.stop();
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

exports.goToCategoryPage = function (req, res) {
  try {
    res.sendFile(path.join(__dirname, "../public", "Categories.html"));
  } catch (err) {
    res.status(400).json({
      status: "fail"
    });
  }
};

exports.createCategory = function _callee4(req, res) {
  var newCategoryName, Buffer, category, categories;
  return regeneratorRuntime.async(function _callee4$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          newCategoryName = req.body.newCategoryName;
          _context10.next = 4;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).resize({
            width: 1024,
            high: 768
          }).toBuffer());

        case 4:
          Buffer = _context10.sent;
          category = new Category({
            img: Buffer,
            Name: newCategoryName,
            createdAt: new Date(Date.now())
          });
          _context10.next = 8;
          return regeneratorRuntime.awrap(category.save());

        case 8:
          _context10.next = 10;
          return regeneratorRuntime.awrap(categoriesFind());

        case 10:
          categories = _context10.sent;
          res.send({
            ok: true,
            categories: categories
          });
          _context10.next = 17;
          break;

        case 14:
          _context10.prev = 14;
          _context10.t0 = _context10["catch"](0);
          res.status(400).json({
            status: "fail"
          });

        case 17:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.editCategory = function _callee7(req, res) {
  var _req$body, categoryId, newCategoryName, newCategoryImg, Buffer;

  return regeneratorRuntime.async(function _callee7$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _req$body = req.body, categoryId = _req$body.categoryId, newCategoryName = _req$body.newCategoryName, newCategoryImg = _req$body.newCategoryImg;
          _context13.prev = 1;

          if (!req.file) {
            _context13.next = 10;
            break;
          }

          _context13.next = 5;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).resize({
            width: 1024,
            high: 768
          }).toBuffer());

        case 5:
          Buffer = _context13.sent;
          _context13.next = 8;
          return regeneratorRuntime.awrap(Category.findOneAndUpdate({
            _id: categoryId
          }, {
            img: Buffer,
            Name: newCategoryName
          }, function _callee5(err, category) {
            var categories;
            return regeneratorRuntime.async(function _callee5$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    if (!err) {
                      _context11.next = 4;
                      break;
                    }

                    res.send({
                      ok: false
                    });
                    _context11.next = 8;
                    break;

                  case 4:
                    _context11.next = 6;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 6:
                    categories = _context11.sent;
                    res.send({
                      ok: true,
                      category: category,
                      categories: categories
                    });

                  case 8:
                  case "end":
                    return _context11.stop();
                }
              }
            });
          }));

        case 8:
          _context13.next = 12;
          break;

        case 10:
          _context13.next = 12;
          return regeneratorRuntime.awrap(Category.findOneAndUpdate({
            _id: categoryId
          }, {
            Name: newCategoryName
          }, function _callee6(err, category) {
            var categories;
            return regeneratorRuntime.async(function _callee6$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    if (!err) {
                      _context12.next = 4;
                      break;
                    }

                    // console.log(err);
                    res.send({
                      ok: false
                    });
                    _context12.next = 8;
                    break;

                  case 4:
                    _context12.next = 6;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 6:
                    categories = _context12.sent;
                    res.send({
                      ok: true,
                      category: category,
                      categories: categories
                    });

                  case 8:
                  case "end":
                    return _context12.stop();
                }
              }
            });
          }));

        case 12:
          _context13.next = 17;
          break;

        case 14:
          _context13.prev = 14;
          _context13.t0 = _context13["catch"](1);
          res.status(400).json({
            status: "fail"
          });

        case 17:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[1, 14]]);
};

exports.deleteCategory = function _callee9(req, res) {
  var chosenCategoryid;
  return regeneratorRuntime.async(function _callee9$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          chosenCategoryid = req.body.chosenCategoryid;
          _context15.next = 4;
          return regeneratorRuntime.awrap(Category.findOneAndDelete({
            _id: chosenCategoryid
          }, function _callee8(err, category) {
            var deletePostCommentsFavorites, categories;
            return regeneratorRuntime.async(function _callee8$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    if (!err) {
                      _context14.next = 4;
                      break;
                    }

                    res.send({
                      ok: false
                    });
                    _context14.next = 11;
                    break;

                  case 4:
                    _context14.next = 6;
                    return regeneratorRuntime.awrap(findPostsCategoryAndDelete(chosenCategoryid));

                  case 6:
                    deletePostCommentsFavorites = _context14.sent;
                    _context14.next = 9;
                    return regeneratorRuntime.awrap(categoriesFind());

                  case 9:
                    categories = _context14.sent;
                    res.send({
                      ok: true,
                      categories: categories
                    });

                  case 11:
                  case "end":
                    return _context14.stop();
                }
              }
            });
          }));

        case 4:
          _context15.next = 9;
          break;

        case 6:
          _context15.prev = 6;
          _context15.t0 = _context15["catch"](0);
          res.status(400).json({
            status: "fail"
          });

        case 9:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.getCategories = function _callee10(req, res) {
  var categories;
  return regeneratorRuntime.async(function _callee10$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(categoriesFind());

        case 3:
          categories = _context16.sent;

          if (categories === false || categories === undefined) {
            res.send({
              ok: false
            });
          } else {
            res.send({
              categories: categories
            });
          }

          _context16.next = 10;
          break;

        case 7:
          _context16.prev = 7;
          _context16.t0 = _context16["catch"](0);
          res.status(400).json({
            status: "fail"
          });

        case 10:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getCategoryInfo = function _callee11(req, res) {
  var categoryId, categoryInfo;
  return regeneratorRuntime.async(function _callee11$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          categoryId = req.params.id;
          _context17.next = 4;
          return regeneratorRuntime.awrap(getCategoryInfo(categoryId));

        case 4:
          categoryInfo = _context17.sent;
          res.send({
            categoryInfo: categoryInfo
          });
          _context17.next = 11;
          break;

        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](0);
          res.status(400).json({
            status: "fail"
          });

        case 11:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 8]]);
};