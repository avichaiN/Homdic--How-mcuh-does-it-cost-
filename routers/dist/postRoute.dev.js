"use strict";

var express = require("express");

var formidable = require("formidable");

var router = express.Router();

var Post = require("../models/post");

var User = require("../models/user");

var temp = require("../models/temp");

var Comment = require("../models/comment");

var checkUserToken = require("./gFunctions/checkUserToken");

var checkAdmin = require("./gFunctions/checkAdmin");

var path = require("path");

var moment = require("moment");

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
          res.send({
            foundPostsByCategoryId: foundPostsByCategoryId
          });

        case 5:
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
  return Post.find({
    $or: [{
      title: {
        $regex: searched,
        $options: ""
      }
    }, {
      desc: {
        $regex: searched,
        $options: ""
      }
    }]
  }).exec();
};

router.get("/search/get/:id", checkUserToken, function _callee3(req, res) {
  var searchedKeywords, searchedSplitted, foundPosts;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          searchedKeywords = req.params.id;
          searchedSplitted = searchedKeywords.replace(/[-]+/, " ");
          _context3.next = 4;
          return regeneratorRuntime.awrap(searchRegExp(searchedSplitted));

        case 4:
          foundPosts = _context3.sent;
          res.send({
            foundPosts: foundPosts,
            searchedSplitted: searchedSplitted
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //delete post by _id

router["delete"]("/", checkUserToken, function _callee5(req, res) {
  var postId;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          postId = req.body.postId;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Post.findOneAndRemove({
            _id: postId
          }, function _callee4(err, post) {
            var deleteComments;
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!err) {
                      _context4.next = 4;
                      break;
                    }

                    res.send({
                      deleted: false
                    });
                    _context4.next = 8;
                    break;

                  case 4:
                    _context4.next = 6;
                    return regeneratorRuntime.awrap(deletePostComments(postId));

                  case 6:
                    deleteComments = _context4.sent;
                    res.send({
                      deleted: true
                    });

                  case 8:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }));

        case 4:
          _context5.next = 10;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);
          res.send({
            deleted: false
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 6]]);
});

var deletePostComments = function deletePostComments(postId) {
  return regeneratorRuntime.async(function deletePostComments$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", Comment.deleteMany({
            postId: postId
          }).exec());

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}; //get posts by user id


var findPostsByUser = function findPostsByUser(userId) {
  return Post.find({
    publishedBy: userId
  }).exec();
};

router.post("/user/get", checkUserToken, function _callee6(req, res) {
  var userId, foundPosts;
  return regeneratorRuntime.async(function _callee6$(_context7) {
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
            ok: false
          });

        case 12:
        case "end":
          return _context7.stop();
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
  return regeneratorRuntime.async(function _callee7$(_context8) {
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
            ok: false
          });

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // add post to fav posts

var addPostToFavorite = function addPostToFavorite(postID, userId) {
  return regeneratorRuntime.async(function addPostToFavorite$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", User.findOneAndUpdate({
            _id: userId
          }, {
            $push: {
              favPosts: postID
            }
          }).exec());

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var deletePostFromFavorite = function deletePostFromFavorite(postID, userId) {
  return regeneratorRuntime.async(function deletePostFromFavorite$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", User.findOneAndUpdate({
            _id: userId
          }, {
            $pull: {
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

var checkIfPostInFavorite = function checkIfPostInFavorite(postID, userId) {
  var checkIfFavorite, user, favoriteArray;
  return regeneratorRuntime.async(function checkIfPostInFavorite$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          checkIfFavorite = false;
          _context11.next = 3;
          return regeneratorRuntime.awrap(User.find({
            _id: userId
          }));

        case 3:
          user = _context11.sent;
          favoriteArray = user[0].favPosts;
          checkIfFavorite = favoriteArray.includes(postID);

          if (!checkIfFavorite) {
            _context11.next = 10;
            break;
          }

          return _context11.abrupt("return", true);

        case 10:
          return _context11.abrupt("return", false);

        case 11:
        case "end":
          return _context11.stop();
      }
    }
  });
};

router.post("/favorite/add", checkUserToken, function _callee8(req, res) {
  var _req$body2, postID, userId, checkIfAlreadyFav, addToFavPost;

  return regeneratorRuntime.async(function _callee8$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _req$body2 = req.body, postID = _req$body2.postID, userId = _req$body2.userId;
          _context12.next = 3;
          return regeneratorRuntime.awrap(checkIfPostInFavorite(postID, userId));

        case 3:
          checkIfAlreadyFav = _context12.sent;

          if (!checkIfAlreadyFav) {
            _context12.next = 8;
            break;
          }

          res.send({
            fav: false
          });
          _context12.next = 12;
          break;

        case 8:
          _context12.next = 10;
          return regeneratorRuntime.awrap(addPostToFavorite(postID, userId));

        case 10:
          addToFavPost = _context12.sent;
          res.send({
            fav: true
          });

        case 12:
        case "end":
          return _context12.stop();
      }
    }
  });
});
router["delete"]("/favorite/delete", checkUserToken, function _callee9(req, res) {
  var _req$body3, postID, userId, deleteFromFavoritePosts;

  return regeneratorRuntime.async(function _callee9$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _req$body3 = req.body, postID = _req$body3.postID, userId = _req$body3.userId;
          _context13.next = 3;
          return regeneratorRuntime.awrap(deletePostFromFavorite(postID, userId));

        case 3:
          deleteFromFavoritePosts = _context13.sent;
          res.send({
            deleted: true
          });

        case 5:
        case "end":
          return _context13.stop();
      }
    }
  });
});
router.post("/favorite/check", checkUserToken, function _callee10(req, res) {
  var _req$body4, postID, userId, checkIfAlreadyFav;

  return regeneratorRuntime.async(function _callee10$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _req$body4 = req.body, postID = _req$body4.postID, userId = _req$body4.userId;
          _context14.next = 3;
          return regeneratorRuntime.awrap(checkIfPostInFavorite(postID, userId));

        case 3:
          checkIfAlreadyFav = _context14.sent;

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
          return _context14.stop();
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
  return regeneratorRuntime.async(function findPostById$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          return _context15.abrupt("return", Post.findById({
            _id: postId
          }).exec());

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
};

router.post("/favorites/getall", checkUserToken, function _callee11(req, res) {
  var userId, userInfo, favPostsIds, favPosts, post;
  return regeneratorRuntime.async(function _callee11$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          userId = req.body.userId;
          _context16.next = 4;
          return regeneratorRuntime.awrap(getUserFavoritePostsId(userId));

        case 4:
          userInfo = _context16.sent;
          favPostsIds = userInfo.favPosts;
          favPosts = [];
          i = 0;

        case 8:
          if (!(i < favPostsIds.length)) {
            _context16.next = 16;
            break;
          }

          _context16.next = 11;
          return regeneratorRuntime.awrap(findPostById(favPostsIds[i]));

        case 11:
          post = _context16.sent;
          favPosts.push(post);

        case 13:
          i++;
          _context16.next = 8;
          break;

        case 16:
          res.send({
            favPosts: favPosts
          });
          _context16.next = 23;
          break;

        case 19:
          _context16.prev = 19;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0.message);
          res.send({
            error: true
          });

        case 23:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 19]]);
});
module.exports = [router];