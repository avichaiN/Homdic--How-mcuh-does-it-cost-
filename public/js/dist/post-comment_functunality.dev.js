"use strict";

function HideAddComment(postID) {
  document.querySelector("#AddCommentButton-".concat(postID)).classList.replace("hide", "show");
  document.querySelector("#cancelButton-".concat(postID)).classList.replace("show", "hide");
  document.querySelector("#addComment-".concat(postID)).classList.replace("show", "hide");
}

function ShowAddComment(postID) {
  document.querySelector("#addComment-".concat(postID)).innerHTML = "<div>\n    <p>\u05D4\u05D5\u05E1\u05E3 \u05EA\u05D2\u05D5\u05D1\u05D4</p>\n    <form onsubmit='handleNewComment(event, \"".concat(postID, "\")'>\n      <textarea style='resize: none;' name=\"message\"></textarea>\n      <input type='text' name=\"price\" placeholder='\u05DE\u05D7\u05D9\u05E8'>\n      <button class=\"sendCommentBtn\" type=\"submit\">\u05E9\u05DC\u05D7</button>\n    </form>\n  </div>");
  document.querySelector("#AddCommentButton-".concat(postID)).classList.replace("show", "hide");
  document.querySelector("#cancelButton-".concat(postID)).classList.replace("hide", "show");
  document.querySelector("#addComment-".concat(postID)).classList.replace("hide", "show");
}

function PostFavoriteButtonClicked() {
  document.querySelector("#FavoriteButton").classList.toggle("Toggled");
} // delete post user/admin


var handleDeletePost = function handleDeletePost(e) {
  var postId = e.target.parentNode.dataset.id;
  var postTitle = e.target.parentNode.dataset.title;
  Swal.fire({
    title: "האם את/ה בטוח/ה?",
    html: "\u05DB\u05D5\u05EA\u05E8\u05EA \u05E4\u05D5\u05E1\u05D8 \u05E9\u05E0\u05D1\u05D7\u05E8: ".concat(postTitle, "<br>\u05DC\u05D0 \u05D9\u05D4\u05D9\u05D4 \u05D0\u05E4\u05E9\u05E8 \u05DC\u05E9\u05D7\u05D6\u05E8 \u05DE\u05D9\u05D3\u05E2 \u05D6\u05D4!"),
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "לא, בטל!",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "כן, מחק פוסט!"
  }).then(function (result) {
    if (result.isConfirmed) {
      fetch("/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postId: postId
        })
      }).then(function (res) {
        return res.json();
      }).then(function _callee(data) {
        var url;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!data.deleted) {
                  _context.next = 7;
                  break;
                }

                _context.next = 3;
                return regeneratorRuntime.awrap(Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "פוסט נמחק בהצלחה",
                  showConfirmButton: false,
                  timer: 1500
                }));

              case 3:
                url = window.location.href;

                if (url.includes("posts")) {
                  location.reload();
                } else {
                  window.location.href = "/categories.html";
                }

                _context.next = 8;
                break;

              case 7:
                alert("תקלה במחיקת פוסט");

              case 8:
              case "end":
                return _context.stop();
            }
          }
        });
      });
    }
  });
};

var checkIfUserLikedComment = function checkIfUserLikedComment(commentId, userId) {
  var checkLike;
  return regeneratorRuntime.async(function checkIfUserLikedComment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          checkLike = false;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch("/comments/user/like/check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              commentId: commentId,
              userId: userId
            })
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            checkLike = data.checkLike;
          }));

        case 3:
          return _context2.abrupt("return", checkLike);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var checkHowMuchLikes = function checkHowMuchLikes(commentId) {
  var likedAmount;
  return regeneratorRuntime.async(function checkHowMuchLikes$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch("/comments/likedAmount", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              commentId: commentId
            })
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            likedAmount = data.likeAmount;
          }));

        case 2:
          return _context3.abrupt("return", likedAmount);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var handleNewComment = function handleNewComment(e, postID) {
  var user, userId, fName, lName, commentMessage, commentPrice;
  return regeneratorRuntime.async(function handleNewComment$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          e.preventDefault();
          _context5.next = 3;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 3:
          user = _context5.sent;
          userId = user.id;
          fName = user.fName;
          lName = user.lName;
          commentMessage = e.target.children.message.value;
          commentPrice = e.target.children.price.value;
          fetch("/comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              postID: postID,
              userId: userId,
              fName: fName,
              lName: lName,
              commentMessage: commentMessage,
              commentPrice: commentPrice
            })
          }).then(function (res) {
            return res.json();
          }).then(function _callee2(data) {
            return regeneratorRuntime.async(function _callee2$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!data.posted) {
                      _context4.next = 8;
                      break;
                    }

                    _context4.next = 3;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "תגובה פורסמה בהצלחה",
                      showConfirmButton: false,
                      timer: 1500
                    }));

                  case 3:
                    HideAddComment(postID);
                    handleHidePostsComments(postID);
                    setTimeout(function () {
                      handleGetComments(postID);
                    }, 500);
                    _context4.next = 10;
                    break;

                  case 8:
                    _context4.next = 10;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "אנא בדוק שכל השדות תקינים",
                      showConfirmButton: false,
                      timer: 1500
                    }));

                  case 10:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var handleDeleteComment = function handleDeleteComment(commentId) {
  Swal.fire({
    title: "האם את/ה בטוח/ה?",
    html: "\u05DC\u05D0 \u05D9\u05D4\u05D9\u05D4 \u05D0\u05E4\u05E9\u05E8 \u05DC\u05E9\u05D7\u05D6\u05E8 \u05DE\u05D9\u05D3\u05E2 \u05D6\u05D4!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "לא, בטל!",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "כן, מחק תגובה!"
  }).then(function (result) {
    if (result.isConfirmed) {
      fetch("/comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          commentId: commentId
        })
      }).then(function (res) {
        return res.json();
      }).then(function _callee3(data) {
        var postId;
        return regeneratorRuntime.async(function _callee3$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!data.deleted) {
                  _context6.next = 6;
                  break;
                }

                postId = data.deleteCommentFunc.postId;
                _context6.next = 4;
                return regeneratorRuntime.awrap(Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "תגובה נמחקה בהצלחה",
                  showConfirmButton: false,
                  timer: 1500
                }));

              case 4:
                handleHidePostsComments(postId);
                setTimeout(function () {
                  handleGetComments(postId);
                }, 500);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        });
      });
    }
  });
};

var handleLikeComment = function handleLikeComment(commentId) {
  var user, userId;
  return regeneratorRuntime.async(function handleLikeComment$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 2:
          user = _context8.sent;
          userId = user.id;
          fetch("/comments/like", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              commentId: commentId,
              userId: userId
            })
          }).then(function (res) {
            return res.json();
          }).then(function _callee4() {
            var likesAmount;
            return regeneratorRuntime.async(function _callee4$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return regeneratorRuntime.awrap(checkHowMuchLikes(commentId));

                  case 2:
                    likesAmount = _context7.sent;
                    document.querySelector(".likeComment-".concat(commentId)).innerHTML = "<span onclick=\"handleUnLikeComment('".concat(commentId, "')\" class=\"material-icons active center liked\" title=\"\u05D4\u05D5\u05E8\u05D3 \u05DC\u05D9\u05D9\u05E7\">favorite_border\n      </span><span class='likesAmount' >").concat(likesAmount, "</span>");

                  case 4:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          });

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
};

var handleUnLikeComment = function handleUnLikeComment(commentId) {
  var user, userId;
  return regeneratorRuntime.async(function handleUnLikeComment$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 2:
          user = _context10.sent;
          userId = user.id;
          fetch("/comments/like", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              commentId: commentId,
              userId: userId
            })
          }).then(function (res) {
            return res.json();
          }).then(function _callee5() {
            var likesAmount;
            return regeneratorRuntime.async(function _callee5$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return regeneratorRuntime.awrap(checkHowMuchLikes(commentId));

                  case 2:
                    likesAmount = _context9.sent;
                    document.querySelector(".likeComment-".concat(commentId)).innerHTML = "<span onclick=\"handleLikeComment('".concat(commentId, "')\" class=\"material-icons active center unliked\" title=\"\u05DC\u05D9\u05D9\u05E7 \u05DC\u05EA\u05D2\u05D5\u05D1\u05D4\">favorite_border\n      </span><span class='likesAmount'>").concat(likesAmount, "</span>");

                  case 4:
                  case "end":
                    return _context9.stop();
                }
              }
            });
          });

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var handleFavoritePost = function handleFavoritePost(postID) {
  var user, userId;
  return regeneratorRuntime.async(function handleFavoritePost$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 2:
          user = _context12.sent;
          userId = user.id;
          fetch("/posts/favorite", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              postID: postID,
              userId: userId
            })
          }).then(function (res) {
            return res.json();
          }).then(function _callee6() {
            return regeneratorRuntime.async(function _callee6$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    document.querySelector(".fav-".concat(postID)).innerHTML = "<span class=\"material-icons fav\" onclick=\"handleDeleteFavoritePost('".concat(postID, "')\"> star </span><p>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</p>");
                    _context11.next = 3;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "פוסט נוסף למועדפים",
                      showConfirmButton: false,
                      timer: 1500
                    }));

                  case 3:
                  case "end":
                    return _context11.stop();
                }
              }
            });
          });

        case 5:
        case "end":
          return _context12.stop();
      }
    }
  });
};

var handleDeleteFavoritePost = function handleDeleteFavoritePost(postID) {
  var user, userId;
  return regeneratorRuntime.async(function handleDeleteFavoritePost$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 2:
          user = _context14.sent;
          userId = user.id;
          fetch("/posts/favorite", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              postID: postID,
              userId: userId
            })
          }).then(function (res) {
            return res.json();
          }).then(function _callee7() {
            var url, params;
            return regeneratorRuntime.async(function _callee7$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    url = window.location.href;
                    params = url.split("?")[1];
                    document.querySelector(".fav-".concat(postID)).innerHTML = "<span class=\"material-icons notFav\" onclick=\"handleFavoritePost('".concat(postID, "')\"> star </span><p>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</p>");
                    _context13.next = 5;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "פוסט נמחק מהמועדפים",
                      showConfirmButton: false,
                      timer: 1500
                    }));

                  case 5:
                    if (params.includes("myfavorites")) {
                      location.reload();
                    }

                  case 6:
                  case "end":
                    return _context13.stop();
                }
              }
            });
          });

        case 5:
        case "end":
          return _context14.stop();
      }
    }
  });
};

var checkIfPostFavorite = function checkIfPostFavorite(postID, userId) {
  var checkFav;
  return regeneratorRuntime.async(function checkIfPostFavorite$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          checkFav = false;
          _context15.next = 3;
          return regeneratorRuntime.awrap(fetch("/posts/favorites", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              postID: postID,
              userId: userId
            })
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            checkFav = data.checkFav;
          }));

        case 3:
          return _context15.abrupt("return", checkFav);

        case 4:
        case "end":
          return _context15.stop();
      }
    }
  });
};

var handleGetComments = function handleGetComments(postId, sort) {
  var numberOfComments, app, loadingComments;
  return regeneratorRuntime.async(function handleGetComments$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(checkHowMuchComments(postId));

        case 2:
          numberOfComments = _context17.sent;

          if (numberOfComments >= 1) {
            app = document.querySelector(".renderComment-".concat(postId));
            loadingComments = document.querySelector(".loadingComments-".concat(postId));
            loadingComments.style.display = "flex";

            if (app.innerHTML.length > 0) {
              loadingComments.style.display = "none";
              handleHidePostsComments(postId);
            } else {
              fetch("/comments/".concat(postId)).then(function (res) {
                return res.json();
              }).then(function _callee8(data) {
                return regeneratorRuntime.async(function _callee8$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
                      case 0:
                        if (data.status === "unauthorized") {
                          window.location.href = "index.html";
                        } else {
                          if (sort == "date") {
                            renderCommentsToDom(postId, data, "date");
                          } else if (sort == "like") {
                            renderCommentsToDom(postId, data, "like");
                          } else {
                            renderCommentsToDom(postId, data, "");
                          }
                        }

                      case 1:
                      case "end":
                        return _context16.stop();
                    }
                  }
                });
              });
            }
          }

        case 4:
        case "end":
          return _context17.stop();
      }
    }
  });
};

var sortCommentsByDate = function sortCommentsByDate(postId) {
  var app = document.querySelector(".renderComment-".concat(postId));
  app.innerHTML = "";
  handleGetComments(postId, "date");
};

var sortCommentsByLike = function sortCommentsByLike(postId) {
  var app = document.querySelector(".renderComment-".concat(postId));
  app.innerHTML = "";
  handleGetComments(postId, "like");
};

var renderCommentsToDom = function renderCommentsToDom(postId, data, sort) {
  var numberOfComments, sortByLike, sortByDate, app, loadingComments, commentsHtml, comments, userInfo, userId, isAdmin, isUsersComment, commentCreatedTime, timeAgo, liked, likesAmount, fullComment, hideCommentsButton, sortComments;
  return regeneratorRuntime.async(function renderCommentsToDom$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(checkHowMuchComments(postId));

        case 2:
          numberOfComments = _context18.sent;
          sortByLike = false;
          sortByDate = false;

          if (sort == "like") {
            sortByLike = true;
          } else if (sort == "date") {
            sortByDate = true;
          }

          app = document.querySelector(".renderComment-".concat(postId));
          loadingComments = document.querySelector(".loadingComments-".concat(postId));
          document.querySelector(".commentArrow-".concat(postId)).innerHTML = "<span data-id='".concat(postId, "' data-comments='").concat(numberOfComments, "' onclick=\"handleHidePostsComments('").concat(postId, "')\" class=\"material-icons\">arrow_upward</span>\n<p data-id='").concat(postId, "' data-comments='").concat(numberOfComments, "' onclick=\"handleHidePostsComments('").concat(postId, "')\">\u05EA\u05D2\u05D5\u05D1\u05D5\u05EA: ").concat(numberOfComments, "</p>");
          app.innerHTML = "";
          commentsHtml = "";
          comments = data.comments;
          _context18.next = 14;
          return regeneratorRuntime.awrap(getUserInfo());

        case 14:
          userInfo = _context18.sent;
          userId = userInfo.id;
          isAdmin = false;
          _context18.next = 19;
          return regeneratorRuntime.awrap(handleCheckAdmin());

        case 19:
          isAdmin = _context18.sent;

          if (sortByDate) {
            comments = comments.reverse();
          }

          if (sortByLike) {
            comments.sort(function (a, b) {
              return b.likes.length - a.likes.length;
            });
          }

          i = 0;

        case 23:
          if (!(i < comments.length)) {
            _context18.next = 43;
            break;
          }

          _context18.next = 26;
          return regeneratorRuntime.awrap(getUserInfo());

        case 26:
          userInfo = _context18.sent;
          userId = userInfo.id;
          isUsersComment = false;

          if (comments[i].publishedBy === userId || isAdmin) {
            isUsersComment = true;
          }

          commentCreatedTime = Date.parse(comments[i].createdAt);
          timeAgo = timeSince(commentCreatedTime);
          _context18.next = 34;
          return regeneratorRuntime.awrap(checkIfUserLikedComment(comments[i]._id, userId));

        case 34:
          liked = _context18.sent;
          _context18.next = 37;
          return regeneratorRuntime.awrap(checkHowMuchLikes(comments[i]._id));

        case 37:
          likesAmount = _context18.sent;
          fullComment = buildOneComment(comments[i].desc, comments[i].price, comments[i].fName, comments[i].lName, comments[i], timeAgo, comments[i]._id, liked, likesAmount, isUsersComment);
          commentsHtml += fullComment;

        case 40:
          i++;
          _context18.next = 23;
          break;

        case 43:
          app.innerHTML = commentsHtml;
          loadingComments.style.display = "none";
          hideCommentsButton = document.querySelector(".closeComments-".concat(postId));
          sortComments = document.querySelector(".sortComments-".concat(postId));
          hideCommentsButton.style.display = "block";
          sortComments.style.display = "flex";

        case 49:
        case "end":
          return _context18.stop();
      }
    }
  });
};

var handleHidePostsComments = function handleHidePostsComments(postId) {
  fetch("/comments/".concat(postId)).then(function (res) {
    return res.json();
  }).then(function _callee9(data) {
    var commentsLength, hideCommentsButton, app, sortComments;
    return regeneratorRuntime.async(function _callee9$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            if (data.status === "unauthorized") {
              window.location.href = "index.html";
            } else {
              commentsLength = data.comments.length;
              document.querySelector(".commentArrow-".concat(postId)).innerHTML = "<span data-id='".concat(postId, "' data-comments='").concat(commentsLength, "' onclick=\"handleGetComments('").concat(postId, "', 'date')\" class=\"material-icons\">arrow_downward</span>\n      <p data-id='").concat(postId, "' data-comments='").concat(commentsLength, "' onclick=\"handleGetComments('").concat(postId, "', 'date')\">\u05EA\u05D2\u05D5\u05D1\u05D5\u05EA: ").concat(commentsLength, "</p>");
              hideCommentsButton = document.querySelector(".closeComments-".concat(postId));
              hideCommentsButton.style.display = "none";
              app = document.querySelector(".renderComment-".concat(postId));
              app.innerHTML = "";
              sortComments = document.querySelector(".sortComments-".concat(postId));
              sortComments.style.display = "none";
            }

          case 1:
          case "end":
            return _context19.stop();
        }
      }
    });
  });
};