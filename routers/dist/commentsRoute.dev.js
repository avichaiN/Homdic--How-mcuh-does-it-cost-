"use strict";

var express = require("express");

var router = express.Router();

var Comment = require("../models/comment");

var Post = require("../models/post");

var checkUserToken = require("./gFunctions/checkUserToken"); // this finds post by id, finds comments by post id, and send back to client.


router.get('/:id', checkUserToken, function _callee(req, res) {
  var postId, post, comments;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          postId = req.params.id;
          _context.next = 4;
          return regeneratorRuntime.awrap(findPostById(postId));

        case 4:
          post = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(findCommentsByPostId(postId));

        case 7:
          comments = _context.sent;
          res.send({
            post: post,
            comments: comments
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
});

var findPostById = function findPostById(postId) {
  return regeneratorRuntime.async(function findPostById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", Post.findById({
            _id: postId
          }).exec());

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var findCommentsByPostId = function findCommentsByPostId(postId) {
  return regeneratorRuntime.async(function findCommentsByPostId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Comment.aggregate([{
            $match: {
              postId: postId
            }
          }]));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

router.post("/", checkUserToken, function _callee2(req, res) {
  var _req$body, postID, userId, fName, lName, commentMessage, commentPrice, comment, comments, commentLength;

  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, postID = _req$body.postID, userId = _req$body.userId, fName = _req$body.fName, lName = _req$body.lName, commentMessage = _req$body.commentMessage, commentPrice = _req$body.commentPrice;
          comment = new Comment({
            desc: commentMessage,
            price: commentPrice,
            postId: postID,
            fName: fName,
            lName: lName,
            publishedBy: userId
          });
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(comment.save());

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(findCommentsByPostId(postID));

        case 7:
          comments = _context4.sent;
          commentLength = comments.length;
          res.send({
            posted: true,
            comment: comment,
            commentLength: commentLength
          });
          _context4.next = 16;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](2);
          console.log(_context4.t0.message);
          res.send({
            posted: false
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 12]]);
});

var deleteComment = function deleteComment(commentId) {
  return Comment.findOneAndDelete({
    _id: commentId
  }).exec();
};

router["delete"]("/", checkUserToken, function _callee3(req, res) {
  var commentId, deleteCommentFunc;
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          commentId = req.body.commentId;
          _context5.next = 3;
          return regeneratorRuntime.awrap(deleteComment(commentId));

        case 3:
          deleteCommentFunc = _context5.sent;
          res.send({
            deleted: true
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});

var addLikeToComment = function addLikeToComment(commentId, userId) {
  return regeneratorRuntime.async(function addLikeToComment$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", Comment.findOneAndUpdate({
            _id: commentId
          }, {
            $push: {
              likes: userId
            }
          }).exec());

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var deleteLikeToComment = function deleteLikeToComment(commentId, userId) {
  return regeneratorRuntime.async(function deleteLikeToComment$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", Comment.findOneAndUpdate({
            _id: commentId
          }, {
            $pull: {
              likes: userId
            }
          }).exec());

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

router.post("/like", checkUserToken, function _callee4(req, res) {
  var _req$body2, commentId, userId, addLike;

  return regeneratorRuntime.async(function _callee4$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$body2 = req.body, commentId = _req$body2.commentId, userId = _req$body2.userId;
          _context8.next = 3;
          return regeneratorRuntime.awrap(addLikeToComment(commentId, userId));

        case 3:
          addLike = _context8.sent;
          res.send({
            liked: true
          });

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
});
router["delete"]("/like", checkUserToken, function _callee5(req, res) {
  var _req$body3, commentId, userId, deleteLike;

  return regeneratorRuntime.async(function _callee5$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _req$body3 = req.body, commentId = _req$body3.commentId, userId = _req$body3.userId;
          _context9.next = 3;
          return regeneratorRuntime.awrap(deleteLikeToComment(commentId, userId));

        case 3:
          deleteLike = _context9.sent;
          res.send({
            deleted: true
          });

        case 5:
        case "end":
          return _context9.stop();
      }
    }
  });
});

var checkIfUserLikedComment = function checkIfUserLikedComment(commentId, userId) {
  var checkIfUserLiked, comment, commentsLikes;
  return regeneratorRuntime.async(function checkIfUserLikedComment$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          checkIfUserLiked = false;
          _context10.next = 3;
          return regeneratorRuntime.awrap(Comment.find({
            _id: commentId
          }));

        case 3:
          comment = _context10.sent;
          commentsLikes = comment[0].likes;
          checkIfUserLiked = commentsLikes.includes(userId);

          if (!checkIfUserLiked) {
            _context10.next = 10;
            break;
          }

          return _context10.abrupt("return", true);

        case 10:
          return _context10.abrupt("return", false);

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var checkHowMuchLikesComment = function checkHowMuchLikesComment(commentId) {
  return Comment.find({
    _id: commentId
  }).exec();
};

router.post("/likedAmount", checkUserToken, function _callee6(req, res) {
  var commentId, checkLikeAmount, likeAmount;
  return regeneratorRuntime.async(function _callee6$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          commentId = req.body.commentId;
          _context11.next = 3;
          return regeneratorRuntime.awrap(checkHowMuchLikesComment(commentId));

        case 3:
          checkLikeAmount = _context11.sent;
          likeAmount = checkLikeAmount[0].likes.length;
          res.send({
            likeAmount: likeAmount
          });

        case 6:
        case "end":
          return _context11.stop();
      }
    }
  });
});
router.post("/user/like/check", checkUserToken, function _callee7(req, res) {
  var _req$body4, commentId, userId, checkLike;

  return regeneratorRuntime.async(function _callee7$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _req$body4 = req.body, commentId = _req$body4.commentId, userId = _req$body4.userId;
          _context12.next = 3;
          return regeneratorRuntime.awrap(checkIfUserLikedComment(commentId, userId));

        case 3:
          checkLike = _context12.sent;
          res.send({
            checkLike: checkLike
          });

        case 5:
        case "end":
          return _context12.stop();
      }
    }
  });
});
router.post('/length', checkUserToken, function _callee8(req, res) {
  var postId, comments, commentLength;
  return regeneratorRuntime.async(function _callee8$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          postId = req.body.postId;
          _context13.next = 4;
          return regeneratorRuntime.awrap(findCommentsByPostId(postId));

        case 4:
          comments = _context13.sent;
          commentLength = comments.length;
          res.send({
            commentLength: commentLength
          });
          _context13.next = 13;
          break;

        case 9:
          _context13.prev = 9;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0.message);
          res.send({
            error: true
          });

        case 13:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;