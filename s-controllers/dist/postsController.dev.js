"use strict";

var Post = require("../s-models/post");

var Comment = require("../s-models/comment");

var User = require("../s-models/user");

var sharp = require("sharp");

var mongoose = require("mongoose");

var moment = require('moment-timezone');

exports.timeAgo = function _callee(req, res) {
  var postedAgo;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(howLongAgoPosted(req.body.date));

        case 3:
          postedAgo = _context.sent;
          res.send({
            postedAgo: postedAgo
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.createPost = function _callee2(req, res) {
  var _req$body, userId, categoryId, title, desc, post, Buffer;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          moment.tz.setDefault("Asia/Jerusalem");
          console.log(moment().format());
          _req$body = req.body, userId = _req$body.userId, categoryId = _req$body.categoryId, title = _req$body.title, desc = _req$body.desc;
          post = new Post({
            title: title,
            desc: desc,
            categoryId: categoryId,
            publishedBy: userId,
            createdAt: moment().tz("Asia/Jerusalem").format()
          });

          if (!req.file) {
            _context2.next = 11;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).resize({
            width: 350,
            high: 350
          }).toBuffer());

        case 8:
          Buffer = _context2.sent;
          post.img = Buffer;
          post.imgName = req.file.name;

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(post.save(post));

        case 13:
          res.send({
            posted: true,
            post: post
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.deletePost = function _callee4(req, res) {
  var postId;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          postId = req.body.postId;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Post.findOneAndRemove({
            _id: postId
          }, function _callee3(err, post) {
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!err) {
                      _context3.next = 4;
                      break;
                    }

                    res.send({
                      deleted: false
                    });
                    _context3.next = 9;
                    break;

                  case 4:
                    _context3.next = 6;
                    return regeneratorRuntime.awrap(deletePostComments(postId));

                  case 6:
                    _context3.next = 8;
                    return regeneratorRuntime.awrap(deleteFromFavorites(postId));

                  case 8:
                    res.send({
                      deleted: true
                    });

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }));

        case 4:
          _context4.next = 10;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.getPostsByCategory = function _callee5(req, res) {
  var foundPostsByCategoryId;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          chosenCategoryId = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Post.aggregate([{
            $match: {
              categoryId: chosenCategoryId
            }
          }]));

        case 4:
          foundPostsByCategoryId = _context5.sent;
          res.send({
            foundPostsByCategoryId: foundPostsByCategoryId
          });
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getPostsByKeywords = function _callee6(req, res) {
  var searchedKeywords, searchedSplitted, foundPosts;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          searchedKeywords = req.params.id;
          searchedSplitted = searchedKeywords.replace(/[-]+/, " ");
          _context6.next = 5;
          return regeneratorRuntime.awrap(searchRegExp(searchedSplitted));

        case 5:
          foundPosts = _context6.sent;
          res.send({
            foundPosts: foundPosts,
            searchedSplitted: searchedSplitted
          });
          _context6.next = 13;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getPostsByUser = function _callee7(req, res) {
  var userId, foundPosts;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.body.userId;
          _context7.next = 4;
          return regeneratorRuntime.awrap(findPostsByUser(userId));

        case 4:
          foundPosts = _context7.sent;
          res.send({
            foundPosts: foundPosts,
            ok: true
          });
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getPostsByUserAdmin = function _callee8(req, res) {
  var userId, userInfo, foundPosts;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          userId = req.body.userId;
          _context8.next = 4;
          return regeneratorRuntime.awrap(findUserById(userId));

        case 4:
          userInfo = _context8.sent;
          _context8.next = 7;
          return regeneratorRuntime.awrap(findPostsByUser(userId));

        case 7:
          foundPosts = _context8.sent;
          res.send({
            foundPosts: foundPosts,
            ok: true,
            userInfo: userInfo
          });
          _context8.next = 15;
          break;

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.addPostToFavorite = function _callee9(req, res) {
  var _req$body2, postID, userId, checkIfAlreadyFav, addToFavPost;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body2 = req.body, postID = _req$body2.postID, userId = _req$body2.userId;
          _context9.next = 4;
          return regeneratorRuntime.awrap(checkIfPostInFavorite(postID, userId));

        case 4:
          checkIfAlreadyFav = _context9.sent;

          if (!checkIfAlreadyFav) {
            _context9.next = 9;
            break;
          }

          res.send({
            fav: false
          });
          _context9.next = 13;
          break;

        case 9:
          _context9.next = 11;
          return regeneratorRuntime.awrap(addPostToFavorite(postID, userId));

        case 11:
          addToFavPost = _context9.sent;
          res.send({
            fav: true
          });

        case 13:
          _context9.next = 19;
          break;

        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 19:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.deletePostFromFavorite = function _callee10(req, res) {
  var _req$body3, postID, userId, deleteFromFavoritePosts;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _req$body3 = req.body, postID = _req$body3.postID, userId = _req$body3.userId;
          _context10.next = 4;
          return regeneratorRuntime.awrap(deletePostFromFavorite(postID, userId));

        case 4:
          deleteFromFavoritePosts = _context10.sent;
          res.send({
            deleted: true
          });
          _context10.next = 12;
          break;

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.checkIfPostFavorite = function _callee11(req, res) {
  var _req$body4, postID, userId, checkIfAlreadyFav;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$body4 = req.body, postID = _req$body4.postID, userId = _req$body4.userId;
          _context11.next = 4;
          return regeneratorRuntime.awrap(checkIfPostInFavorite(postID, userId));

        case 4:
          checkIfAlreadyFav = _context11.sent;

          if (checkIfAlreadyFav) {
            res.send({
              checkFav: true
            });
          } else {
            res.send({
              checkFav: false
            });
          }

          _context11.next = 12;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getFavoritePosts = function _callee12(req, res) {
  var userId, userInfo, favPostsIds, favPosts, post;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          userId = req.params.id;
          _context12.next = 4;
          return regeneratorRuntime.awrap(getUserFavoritePostsId(userId));

        case 4:
          userInfo = _context12.sent;
          favPostsIds = userInfo.favPosts;
          favPosts = [];
          i = 0;

        case 8:
          if (!(i < favPostsIds.length)) {
            _context12.next = 16;
            break;
          }

          _context12.next = 11;
          return regeneratorRuntime.awrap(findPostById(favPostsIds[i]));

        case 11:
          post = _context12.sent;
          favPosts.push(post);

        case 13:
          i++;
          _context12.next = 8;
          break;

        case 16:
          res.send({
            favPosts: favPosts
          });
          _context12.next = 23;
          break;

        case 19:
          _context12.prev = 19;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 23:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

exports.getUserWhoPostedName = function _callee13(req, res) {
  var userId, userFNameLName;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          userId = req.params.id;
          _context13.next = 4;
          return regeneratorRuntime.awrap(getFnameAndlName(userId));

        case 4:
          userFNameLName = _context13.sent;
          res.send({
            userFNameLName: userFNameLName
          });
          _context13.next = 12;
          break;

        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 12:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var searchRegExp = function searchRegExp(searched) {
  var foundPosts;
  return regeneratorRuntime.async(function searchRegExp$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(Post.aggregate([{
            $match: {
              "desc": {
                $regex: searched,
                $options: "i"
              }
            }
          }]));

        case 2:
          foundPosts = _context14.sent;
          return _context14.abrupt("return", foundPosts);

        case 4:
        case "end":
          return _context14.stop();
      }
    }
  });
};

var deletePostComments = function deletePostComments(postId) {
  return regeneratorRuntime.async(function deletePostComments$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          return _context15.abrupt("return", Comment.deleteMany({
            postId: postId
          }).exec());

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
};

var deleteFromFavorites = function deleteFromFavorites(postId) {
  var userWhoFavorites;
  return regeneratorRuntime.async(function deleteFromFavorites$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(User.aggregate([{
            $match: {
              favPosts: postId
            }
          }]));

        case 2:
          userWhoFavorites = _context17.sent;
          userWhoFavorites.forEach(function _callee14(user) {
            return regeneratorRuntime.async(function _callee14$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.next = 2;
                    return regeneratorRuntime.awrap(deletePostFromFavorite(postId, user._id));

                  case 2:
                  case "end":
                    return _context16.stop();
                }
              }
            });
          });

        case 4:
        case "end":
          return _context17.stop();
      }
    }
  });
};

var findPostsByUser = function findPostsByUser(userId) {
  return Post.aggregate([{
    $match: {
      publishedBy: userId
    }
  }]).exec();
};

var findUserById = function findUserById(userId) {
  return User.findOne({
    _id: userId
  }).exec();
};

var addPostToFavorite = function addPostToFavorite(postID, userId) {
  return regeneratorRuntime.async(function addPostToFavorite$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          return _context18.abrupt("return", User.findOneAndUpdate({
            _id: userId
          }, {
            $push: {
              favPosts: postID
            }
          }).exec());

        case 1:
        case "end":
          return _context18.stop();
      }
    }
  });
};

var deletePostFromFavorite = function deletePostFromFavorite(postID, userId) {
  return regeneratorRuntime.async(function deletePostFromFavorite$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          return _context19.abrupt("return", User.findOneAndUpdate({
            _id: userId
          }, {
            $pull: {
              favPosts: postID
            }
          }).exec());

        case 1:
        case "end":
          return _context19.stop();
      }
    }
  });
};

var checkIfPostInFavorite = function checkIfPostInFavorite(postID, userId) {
  var checkIfFavorite, user, favoriteArray;
  return regeneratorRuntime.async(function checkIfPostInFavorite$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          checkIfFavorite = false;
          _context20.next = 3;
          return regeneratorRuntime.awrap(User.find({
            _id: userId
          }));

        case 3:
          user = _context20.sent;
          favoriteArray = user[0].favPosts;
          checkIfFavorite = favoriteArray.includes(postID);

          if (!checkIfFavorite) {
            _context20.next = 10;
            break;
          }

          return _context20.abrupt("return", true);

        case 10:
          return _context20.abrupt("return", false);

        case 11:
        case "end":
          return _context20.stop();
      }
    }
  });
};

var getUserFavoritePostsId = function getUserFavoritePostsId(userId) {
  return User.findOne({
    _id: userId
  }).exec();
};

var findPostById = function findPostById(postId) {
  var ObjectId;
  return regeneratorRuntime.async(function findPostById$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          ObjectId = mongoose.Types.ObjectId;
          return _context21.abrupt("return", Post.aggregate([{
            $match: {
              _id: ObjectId("".concat(postId))
            }
          }]));

        case 2:
        case "end":
          return _context21.stop();
      }
    }
  });
};

var getFnameAndlName = function getFnameAndlName(userId) {
  var user;
  return regeneratorRuntime.async(function getFnameAndlName$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return regeneratorRuntime.awrap(User.findById({
            _id: userId
          }).exec());

        case 2:
          user = _context22.sent;
          return _context22.abrupt("return", {
            fName: user.firstName,
            lName: user.lastName
          });

        case 4:
        case "end":
          return _context22.stop();
      }
    }
  });
};

var howLongAgoPosted = function howLongAgoPosted(date) {
  var israel, x, seconds, interval;
  return regeneratorRuntime.async(function howLongAgoPosted$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          israel = moment().tz("Asia/Jerusalem").format();
          x = Date.parse(israel);
          seconds = Math.floor((x - date) / 1000);
          interval = seconds / 31536000;

          if (!(interval > 1)) {
            _context23.next = 6;
            break;
          }

          return _context23.abrupt("return", Math.floor(interval) + " שנים");

        case 6:
          interval = seconds / 2592000;

          if (!(interval > 1)) {
            _context23.next = 9;
            break;
          }

          return _context23.abrupt("return", Math.floor(interval) + " חודשים");

        case 9:
          interval = seconds / 86400;

          if (!(interval > 1)) {
            _context23.next = 12;
            break;
          }

          return _context23.abrupt("return", Math.floor(interval) + " ימים");

        case 12:
          interval = seconds / 3600;

          if (!(interval > 1)) {
            _context23.next = 15;
            break;
          }

          return _context23.abrupt("return", Math.floor(interval) + " שעות");

        case 15:
          interval = seconds / 60;

          if (!(interval > 1)) {
            _context23.next = 18;
            break;
          }

          return _context23.abrupt("return", Math.floor(interval) + " דקות");

        case 18:
          return _context23.abrupt("return", Math.floor(seconds) + " שניות");

        case 19:
        case "end":
          return _context23.stop();
      }
    }
  });
};