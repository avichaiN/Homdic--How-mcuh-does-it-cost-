"use strict";

var express = require("express");

var Post = require("../models/post");

var Comment = require("../models/comment");

var checkUserToken = require("./gFunctions/checkUserToken");

var checkAdmin = require("./gFunctions/checkAdmin");

var router = express.Router();

var User = require("../models/user");

var multer = require("multer");

var sharp = require("sharp");

router.get("/get/:id", checkUserToken, function _callee(req, res) {
  var foundPostsByCategoryId;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          chosenCategoryId = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Post.aggregate([{
            $match: {
              categoryId: chosenCategoryId
            }
          }]));

        case 3:
          foundPostsByCategoryId = _context.sent;
          console.log(foundPostsByCategoryId);
          res.send({
            foundPostsByCategoryId: foundPostsByCategoryId
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
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
router.post("/", uploadImg.single("img"), function _callee2(req, res) {
  var _req$body, userId, userFname, userLname, categoryId, title, desc, Buffer, post;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, userFname = _req$body.userFname, userLname = _req$body.userLname, categoryId = _req$body.categoryId, title = _req$body.title, desc = _req$body.desc;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).resize({
            width: 120,
            high: 120
          }).toBuffer());

        case 4:
          Buffer = _context2.sent;
          post = new Post({
            title: title,
            desc: desc,
            img: Buffer,
            imgName: req.file.name,
            categoryId: categoryId,
            fName: userFname,
            lName: userLname,
            publishedBy: userId,
            createdAt: new Date(Date.now())
          });
          _context2.next = 8;
          return regeneratorRuntime.awrap(post.save(post));

        case 8:
          res.send({
            posted: true,
            post: post
          });
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0.message);
          res.send({
            posted: false,
            error: _context2.t0.message
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
}); //i try to mack a function to upload the file but its not working

/* const fileUpload = (req) => {
  let form = new formidable.IncomingForm();
  form.parse(req);
  console.log(__dirname + '/public/style/img/')
  form.on('fileBegin', function (name, file) { file.path = path.dirname(__dirname) + '/public/styles/img/' + file.name; })
  form.on('file', function (name, file) {
    console.log("Uploaded file", file.name);
  });
} */

var searchRegExp = function searchRegExp(searched) {
  var foundPosts;
  return regeneratorRuntime.async(function searchRegExp$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Post.aggregate([{
            $match: {
              "desc": {
                $regex: searched,
                $options: "i"
              }
            }
          }]));

        case 2:
          foundPosts = _context3.sent;
          return _context3.abrupt("return", foundPosts);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

router.get("/search/get/:id", checkUserToken, function _callee3(req, res) {
  var searchedKeywords, searchedSplitted, foundPosts;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          searchedKeywords = req.params.id;
          searchedSplitted = searchedKeywords.replace(/[-]+/, " ");
          _context4.next = 4;
          return regeneratorRuntime.awrap(searchRegExp(searchedSplitted));

        case 4:
          foundPosts = _context4.sent;
          res.send({
            foundPosts: foundPosts,
            searchedSplitted: searchedSplitted
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //delete post by _id

router["delete"]("/", checkUserToken, function _callee5(req, res) {
  var postId;
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          postId = req.body.postId;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Post.findOneAndRemove({
            _id: postId
          }, function _callee4(err, post) {
            var deleteComments;
            return regeneratorRuntime.async(function _callee4$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!err) {
                      _context5.next = 4;
                      break;
                    }

                    res.send({
                      deleted: false
                    });
                    _context5.next = 8;
                    break;

                  case 4:
                    _context5.next = 6;
                    return regeneratorRuntime.awrap(deletePostComments(postId));

                  case 6:
                    deleteComments = _context5.sent;
                    res.send({
                      deleted: true
                    });

                  case 8:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          }));

        case 4:
          _context6.next = 10;
          break;

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](1);
          console.log(_context6.t0);
          res.send({
            deleted: false
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 6]]);
});

var deletePostComments = function deletePostComments(postId) {
  return regeneratorRuntime.async(function deletePostComments$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", Comment.deleteMany({
            postId: postId
          }).exec());

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
}; //get posts by user id


var findPostsByUser = function findPostsByUser(userId) {
  return Post.aggregate([{
    $match: {
      publishedBy: userId
    }
  }]).exec();
};

router.post("/user/get", checkUserToken, function _callee6(req, res) {
  var userId, foundPosts;
  return regeneratorRuntime.async(function _callee6$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          userId = req.body.userId;
          _context8.next = 4;
          return regeneratorRuntime.awrap(findPostsByUser(userId));

        case 4:
          foundPosts = _context8.sent;
          res.send({
            foundPosts: foundPosts,
            ok: true
          });
          _context8.next = 12;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0.message);
          res.send({
            ok: false
          });

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //find user posts FOR ADMIN ONLy

var findUserById = function findUserById(userId) {
  return User.findOne({
    _id: userId
  }).exec();
};

router.post("/admin/user/get", checkAdmin, function _callee7(req, res) {
  var userId, userInfo, foundPosts;
  return regeneratorRuntime.async(function _callee7$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          userId = req.body.userId;
          _context9.next = 4;
          return regeneratorRuntime.awrap(findUserById(userId));

        case 4:
          userInfo = _context9.sent;
          _context9.next = 7;
          return regeneratorRuntime.awrap(findPostsByUser(userId));

        case 7:
          foundPosts = _context9.sent;
          res.send({
            foundPosts: foundPosts,
            ok: true,
            userInfo: userInfo
          });
          _context9.next = 15;
          break;

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0.message);
          res.send({
            ok: false
          });

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // add post to fav posts

var addPostToFavorite = function addPostToFavorite(postID, userId) {
  return regeneratorRuntime.async(function addPostToFavorite$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", User.findOneAndUpdate({
            _id: userId
          }, {
            $push: {
              favPosts: postID
            }
          }).exec());

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var deletePostFromFavorite = function deletePostFromFavorite(postID, userId) {
  return regeneratorRuntime.async(function deletePostFromFavorite$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          return _context11.abrupt("return", User.findOneAndUpdate({
            _id: userId
          }, {
            $pull: {
              favPosts: postID
            }
          }).exec());

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
};

var checkIfPostInFavorite = function checkIfPostInFavorite(postID, userId) {
  var checkIfFavorite, user, favoriteArray;
  return regeneratorRuntime.async(function checkIfPostInFavorite$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          checkIfFavorite = false;
          _context12.next = 3;
          return regeneratorRuntime.awrap(User.find({
            _id: userId
          }));

        case 3:
          user = _context12.sent;
          favoriteArray = user[0].favPosts;
          checkIfFavorite = favoriteArray.includes(postID);

          if (!checkIfFavorite) {
            _context12.next = 10;
            break;
          }

          return _context12.abrupt("return", true);

        case 10:
          return _context12.abrupt("return", false);

        case 11:
        case "end":
          return _context12.stop();
      }
    }
  });
};

router.post("/favorite/add", checkUserToken, function _callee8(req, res) {
  var _req$body2, postID, userId, checkIfAlreadyFav, addToFavPost;

  return regeneratorRuntime.async(function _callee8$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _req$body2 = req.body, postID = _req$body2.postID, userId = _req$body2.userId;
          _context13.next = 3;
          return regeneratorRuntime.awrap(checkIfPostInFavorite(postID, userId));

        case 3:
          checkIfAlreadyFav = _context13.sent;

          if (!checkIfAlreadyFav) {
            _context13.next = 8;
            break;
          }

          res.send({
            fav: false
          });
          _context13.next = 12;
          break;

        case 8:
          _context13.next = 10;
          return regeneratorRuntime.awrap(addPostToFavorite(postID, userId));

        case 10:
          addToFavPost = _context13.sent;
          res.send({
            fav: true
          });

        case 12:
        case "end":
          return _context13.stop();
      }
    }
  });
});
router["delete"]("/favorite/delete", checkUserToken, function _callee9(req, res) {
  var _req$body3, postID, userId, deleteFromFavoritePosts;

  return regeneratorRuntime.async(function _callee9$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _req$body3 = req.body, postID = _req$body3.postID, userId = _req$body3.userId;
          _context14.next = 3;
          return regeneratorRuntime.awrap(deletePostFromFavorite(postID, userId));

        case 3:
          deleteFromFavoritePosts = _context14.sent;
          res.send({
            deleted: true
          });

        case 5:
        case "end":
          return _context14.stop();
      }
    }
  });
});
router.post("/favorite/check", checkUserToken, function _callee10(req, res) {
  var _req$body4, postID, userId, checkIfAlreadyFav;

  return regeneratorRuntime.async(function _callee10$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _req$body4 = req.body, postID = _req$body4.postID, userId = _req$body4.userId;
          _context15.next = 3;
          return regeneratorRuntime.awrap(checkIfPostInFavorite(postID, userId));

        case 3:
          checkIfAlreadyFav = _context15.sent;

          if (checkIfAlreadyFav) {
            res.send({
              checkFav: true
            });
          } else {
            res.send({
              checkFav: false
            });
          }

        case 5:
        case "end":
          return _context15.stop();
      }
    }
  });
});

var getUserFavoritePostsId = function getUserFavoritePostsId(userId) {
  return User.findOne({
    _id: userId
  }).exec();
};

var findPostById = function findPostById(postId) {
  return regeneratorRuntime.async(function findPostById$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          return _context16.abrupt("return", Post.findById({
            _id: postId
          }).exec());

        case 1:
        case "end":
          return _context16.stop();
      }
    }
  });
};

router.post("/favorites/getall", checkUserToken, function _callee11(req, res) {
  var userId, userInfo, favPostsIds, favPosts, post;
  return regeneratorRuntime.async(function _callee11$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          userId = req.body.userId;
          _context17.next = 4;
          return regeneratorRuntime.awrap(getUserFavoritePostsId(userId));

        case 4:
          userInfo = _context17.sent;
          favPostsIds = userInfo.favPosts;
          favPosts = [];
          i = 0;

        case 8:
          if (!(i < favPostsIds.length)) {
            _context17.next = 17;
            break;
          }

          _context17.next = 11;
          return regeneratorRuntime.awrap(findPostById(favPostsIds[i]));

        case 11:
          post = _context17.sent;
          console.log(post);
          favPosts.push(post);

        case 14:
          i++;
          _context17.next = 8;
          break;

        case 17:
          res.send({
            favPosts: favPosts
          });
          _context17.next = 24;
          break;

        case 20:
          _context17.prev = 20;
          _context17.t0 = _context17["catch"](0);
          console.log(_context17.t0.message);
          res.send({
            error: true
          });

        case 24:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 20]]);
});
module.exports = [router];