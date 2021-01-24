"use strict";

var express = require("express");

var formidable = require('formidable');

var router = express.Router();

var Post = require("../models/post");

var User = require("../models/user");

var checkUserToken = require("./gFunctions/checkUserToken");

var checkAdmin = require("./gFunctions/checkAdmin");

var path = require('path');

router.get('/get/:id', checkUserToken, function _callee(req, res) {
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
router.post("/", checkUserToken, function _callee2(req, res) {
  var _req$body, userId, userFname, userLname, categoryId, title, desc, img, post, form;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, userFname = _req$body.userFname, userLname = _req$body.userLname, categoryId = _req$body.categoryId, title = _req$body.title, desc = _req$body.desc, img = _req$body.img;
          post = new Post({
            title: title,
            desc: desc,
            img: img,
            categoryId: categoryId,
            fName: userFname,
            lName: userLname,
            publishedBy: userId
          });
          _context2.prev = 2;
          //////////////upload the file section/////////////////
          form = new formidable.IncomingForm();
          form.parse(req);
          console.log(__dirname + '/public/style/img/');
          form.on('fileBegin', function (name, file) {
            file.path = path.dirname(__dirname) + '/public/styles/img/' + file.name;
          });
          form.on('file', function (name, file) {
            console.log("Uploaded file", file.name);
          }); ////////////////////////////////////////////////////////////////

          _context2.next = 10;
          return regeneratorRuntime.awrap(post.save(req));

        case 10:
          res.send({
            posted: true,
            post: post
          });
          _context2.next = 17;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](2);
          console.log(_context2.t0.message);
          res.send({
            posted: false
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 13]]);
}); //i try to mack a function to upload the file but its not working

var fileUpload = function fileUpload(req) {
  var form = new formidable.IncomingForm();
  form.parse(req);
  console.log(__dirname + '/public/style/img/');
  form.on('fileBegin', function (name, file) {
    file.path = path.dirname(__dirname) + '/public/styles/img/' + file.name;
  });
  form.on('file', function (name, file) {
    console.log("Uploaded file", file.name);
  });
};

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

router.get('/search/get/:id', checkUserToken, function _callee3(req, res) {
  var searchedKeywords, searchedSplitted, foundPosts;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          searchedKeywords = req.params.id;
          searchedSplitted = searchedKeywords.replace(/[-]+/, ' ');
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
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (err) {
                      res.send({
                        deleted: false
                      });
                    } else {
                      res.send({
                        deleted: true
                      });
                    }

                  case 1:
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
}); //get posts by user id

var findPostsByUser = function findPostsByUser(userId) {
  return Post.find({
    publishedBy: userId
  }).exec();
};

router.post("/user/get", checkUserToken, function _callee6(req, res) {
  var userId, foundPosts;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.body.userId;
          _context6.next = 4;
          return regeneratorRuntime.awrap(findPostsByUser(userId));

        case 4:
          foundPosts = _context6.sent;
          res.send({
            foundPosts: foundPosts,
            ok: true
          });
          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0.message);
          res.send({
            ok: false
          });

        case 12:
        case "end":
          return _context6.stop();
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
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.body.userId;
          _context7.next = 4;
          return regeneratorRuntime.awrap(findUserById(userId));

        case 4:
          userInfo = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(findPostsByUser(userId));

        case 7:
          foundPosts = _context7.sent;
          res.send({
            foundPosts: foundPosts,
            ok: true,
            userInfo: userInfo
          });
          _context7.next = 15;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0.message);
          res.send({
            ok: false
          });

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
module.exports = [router];