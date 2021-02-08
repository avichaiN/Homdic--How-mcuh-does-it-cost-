"use strict";

var Comment = require("../s-models/comment");

var Post = require("../s-models/post");

var moment = require('moment-timezone');

exports.createComment = function _callee(req, res) {
  var _req$body, postID, userId, commentMessage, commentPrice, comment, comments, commentLength;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, postID = _req$body.postID, userId = _req$body.userId, commentMessage = _req$body.commentMessage, commentPrice = _req$body.commentPrice;
          comment = new Comment({
            desc: commentMessage,
            price: commentPrice,
            postId: postID,
            publishedBy: userId,
            createdAt: moment().tz("Asia/Jerusalem").format()
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(comment.save());

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(findCommentsByPostId(postID));

        case 7:
          comments = _context.sent;
          commentLength = comments.length;
          res.send({
            posted: true,
            comment: comment,
            commentLength: commentLength
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.deleteComment = function _callee2(req, res) {
  var commentId, deleteCommentFunc;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          commentId = req.body.commentId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(deleteComment(commentId));

        case 4:
          deleteCommentFunc = _context2.sent;
          res.send({
            deleted: true,
            deleteCommentFunc: deleteCommentFunc
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getPostsComments = function _callee3(req, res) {
  var postId, comments, whenPostedArray, commentCreatedTime, whenPosted, whenPostedInfo;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          postId = req.params.id; // const post = await findPostById(postId)

          _context3.next = 4;
          return regeneratorRuntime.awrap(findCommentsByPostId(postId));

        case 4:
          comments = _context3.sent;
          whenPostedArray = [];
          i = 0;

        case 7:
          if (!(i < comments.length)) {
            _context3.next = 17;
            break;
          }

          commentCreatedTime = Date.parse(comments[i].createdAt);
          _context3.next = 11;
          return regeneratorRuntime.awrap(howLongAgoPosted(commentCreatedTime));

        case 11:
          whenPosted = _context3.sent;
          whenPostedInfo = {
            timeAgo: "".concat(whenPosted),
            commentId: "".concat(comments[i]._id)
          };
          whenPostedArray.push(whenPostedInfo);

        case 14:
          i++;
          _context3.next = 7;
          break;

        case 17:
          res.send({
            comments: comments,
            whenPostedArray: whenPostedArray
          });
          _context3.next = 24;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.addLike = function _callee4(req, res) {
  var _req$body2, commentId, userId, addLike;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, commentId = _req$body2.commentId, userId = _req$body2.userId;
          _context4.next = 4;
          return regeneratorRuntime.awrap(addLikeToComment(commentId, userId));

        case 4:
          addLike = _context4.sent;
          res.send({
            liked: true
          });
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.deleteLike = function _callee5(req, res) {
  var _req$body3, commentId, userId, deleteLike;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body3 = req.body, commentId = _req$body3.commentId, userId = _req$body3.userId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(deleteLikeToComment(commentId, userId));

        case 4:
          deleteLike = _context5.sent;
          res.send({
            deleted: true
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

exports.checkHowMuchLiked = function _callee6(req, res) {
  var commentId, checkLikeAmount, whoLiked, likeAmount;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          commentId = req.body.commentId;
          _context6.next = 4;
          return regeneratorRuntime.awrap(checkHowMuchLikesComment(commentId));

        case 4:
          checkLikeAmount = _context6.sent;
          whoLiked = checkLikeAmount[0].likes;
          likeAmount = checkLikeAmount[0].likes.length;
          res.send({
            likeAmount: likeAmount,
            whoLiked: whoLiked
          });
          _context6.next = 14;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.checkHowMuchComments = function _callee7(req, res) {
  var postId, comments, commentLength;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          postId = req.body.postId;
          _context7.next = 4;
          return regeneratorRuntime.awrap(findCommentsByPostId(postId));

        case 4:
          comments = _context7.sent;
          commentLength = comments.length;
          res.send({
            commentLength: commentLength
          });
          _context7.next = 13;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.checkIfUserLiked = function _callee8(req, res) {
  var _req$body4, commentId, userId, checkLike;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body4 = req.body, commentId = _req$body4.commentId, userId = _req$body4.userId;
          _context8.next = 4;
          return regeneratorRuntime.awrap(checkIfUserLikedComment(commentId, userId));

        case 4:
          checkLike = _context8.sent;
          res.send({
            checkLike: checkLike
          });
          _context8.next = 12;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0.message);
          res.send({
            status: "unauthorized"
          });

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var deleteComment = function deleteComment(commentId) {
  return Comment.findOneAndDelete({
    _id: commentId
  }).exec();
};

var findPostById = function findPostById(postId) {
  return regeneratorRuntime.async(function findPostById$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", Post.findById({
            _id: postId
          }).exec());

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var findCommentsByPostId = function findCommentsByPostId(postId) {
  return regeneratorRuntime.async(function findCommentsByPostId$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(Comment.aggregate([{
            $match: {
              postId: postId
            }
          }]));

        case 2:
          return _context10.abrupt("return", _context10.sent);

        case 3:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var addLikeToComment = function addLikeToComment(commentId, userId) {
  return regeneratorRuntime.async(function addLikeToComment$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          return _context11.abrupt("return", Comment.findOneAndUpdate({
            _id: commentId
          }, {
            $push: {
              likes: userId
            }
          }).exec());

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
};

var deleteLikeToComment = function deleteLikeToComment(commentId, userId) {
  return regeneratorRuntime.async(function deleteLikeToComment$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          return _context12.abrupt("return", Comment.findOneAndUpdate({
            _id: commentId
          }, {
            $pull: {
              likes: userId
            }
          }).exec());

        case 1:
        case "end":
          return _context12.stop();
      }
    }
  });
};

var checkIfUserLikedComment = function checkIfUserLikedComment(commentId, userId) {
  var checkIfUserLiked, comment, commentsLikes;
  return regeneratorRuntime.async(function checkIfUserLikedComment$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          checkIfUserLiked = false;
          _context13.next = 3;
          return regeneratorRuntime.awrap(Comment.find({
            _id: commentId
          }));

        case 3:
          comment = _context13.sent;
          commentsLikes = comment[0].likes;
          checkIfUserLiked = commentsLikes.includes(userId);

          if (!checkIfUserLiked) {
            _context13.next = 10;
            break;
          }

          return _context13.abrupt("return", true);

        case 10:
          return _context13.abrupt("return", false);

        case 11:
        case "end":
          return _context13.stop();
      }
    }
  });
};

var checkHowMuchLikesComment = function checkHowMuchLikesComment(commentId) {
  return Comment.find({
    _id: commentId
  }).exec();
};

var howLongAgoPosted = function howLongAgoPosted(date) {
  var israel, x, seconds, interval;
  return regeneratorRuntime.async(function howLongAgoPosted$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          israel = moment().tz("Asia/Jerusalem").format();
          x = Date.parse(israel);
          seconds = Math.floor((x - date) / 1000);
          interval = seconds / 31536000;

          if (!(interval > 1)) {
            _context14.next = 6;
            break;
          }

          return _context14.abrupt("return", Math.floor(interval) + " שנים");

        case 6:
          interval = seconds / 2592000;

          if (!(interval > 1)) {
            _context14.next = 9;
            break;
          }

          return _context14.abrupt("return", Math.floor(interval) + " חודשים");

        case 9:
          interval = seconds / 86400;

          if (!(interval > 1)) {
            _context14.next = 12;
            break;
          }

          return _context14.abrupt("return", Math.floor(interval) + " ימים");

        case 12:
          interval = seconds / 3600;

          if (!(interval > 1)) {
            _context14.next = 15;
            break;
          }

          return _context14.abrupt("return", Math.floor(interval) + " שעות");

        case 15:
          interval = seconds / 60;

          if (!(interval > 1)) {
            _context14.next = 18;
            break;
          }

          return _context14.abrupt("return", Math.floor(interval) + " דקות");

        case 18:
          return _context14.abrupt("return", Math.floor(seconds) + " שניות");

        case 19:
        case "end":
          return _context14.stop();
      }
    }
  });
};