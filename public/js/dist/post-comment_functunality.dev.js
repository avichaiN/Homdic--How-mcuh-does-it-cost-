"use strict";

function HideAddComment(postID) {
  document.querySelector("#AddCommentButton-".concat(postID)).classList.replace("hide", "show");
  document.querySelector("#cancelButton-".concat(postID)).classList.replace("show", "hide");
  document.querySelector("#addComment-".concat(postID)).classList.replace("show", "hide");
}

function ShowAddComment(postID) {
  document.querySelector("#addComment-".concat(postID)).innerHTML = "<div>\n    <p>\u05D4\u05D5\u05E1\u05E3 \u05EA\u05D2\u05D5\u05D1\u05D4</p>\n    <form onsubmit='handleNewComment(event, \"".concat(postID, "\")'>\n      <textarea style='resize: none;' name=\"message\"></textarea>\n      <input type='text' name=\"price\" placeholder='\u05DE\u05D7\u05D9\u05E8'>\n      <input type=\"submit\" value=\"\u05E9\u05DC\u05D7\">\n    </form>\n  </div>");
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

var handleClickPost = function handleClickPost(postId) {
  console.log(postId);
  window.location.href = "/comments.html?".concat(postId);
}; // get post by id and comments by postid


var getRenderPostComments = function getRenderPostComments() {
  var url = window.location.href;
  var postId = url.split("?")[1];
  fetch("/comments/".concat(postId)).then(function (res) {
    return res.json();
  }).then(function _callee3(data) {
    var post, comments, userInfo, userId, isAdmin, isUsersPost, isFavorite, html, newAppSection;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(data.status === "unauthorized")) {
              _context3.next = 4;
              break;
            }

            window.location.href = "index.html";
            _context3.next = 25;
            break;

          case 4:
            post = data.post;
            comments = data.comments;
            _context3.next = 8;
            return regeneratorRuntime.awrap(getUserInfo());

          case 8:
            userInfo = _context3.sent;
            userId = userInfo.id;
            isAdmin = false;
            _context3.next = 13;
            return regeneratorRuntime.awrap(handleCheckAdmin());

          case 13:
            isAdmin = _context3.sent;
            isUsersPost = false;
            _context3.next = 17;
            return regeneratorRuntime.awrap(checkIfPostFavorite(post._id, userId));

          case 17:
            isFavorite = _context3.sent;

            if (post.publishedBy === userId) {
              isUsersPost = true;
            }

            html = buildOnePost("post", post.title, post.desc, post.img, "0", comments.length, post._id, post.fName, post.lName, isFavorite);
            app.style.top = "8%";
            newAppSection = app.innerHTML.replace('<div class="commenstsSection">', html + '<div class="commenstsSection">');
            app.innerHTML = newAppSection;

            if (isUsersPost || isAdmin) {
              document.getElementById("".concat(post._id)).innerHTML = "<button class='deletePostButton' style=\"display:block;\" onclick=\"handleDeletePost(event)\">\u05DE\u05D7\u05E7 \u05E4\u05D5\u05E1\u05D8</button>";
            }

            comments.forEach(function _callee2(comment) {
              var isUsersComment, date, x, when, liked, likesAmount, app, fullComment;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(getUserInfo());

                    case 2:
                      userInfo = _context2.sent;
                      userId = userInfo.id;
                      isUsersComment = false;

                      if (comment.publishedBy === userId) {
                        isUsersComment = true;
                      }

                      date = comment.createdAt;
                      x = date.split("T")[1];
                      when = x.split("+")[0];
                      _context2.next = 11;
                      return regeneratorRuntime.awrap(checkIfUserLikedComment(comment._id, userId));

                    case 11:
                      liked = _context2.sent;
                      _context2.next = 14;
                      return regeneratorRuntime.awrap(checkHowMuchLikes(comment._id));

                    case 14:
                      likesAmount = _context2.sent;
                      app = document.querySelector(".commenstsSection");
                      fullComment = buildOneComment(comment.desc, comment.price, comment.fName, comment.lName, when, comment._id, liked, likesAmount, isUsersComment);
                      app.innerHTML += fullComment;

                    case 18:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
};

var checkIfUserLikedComment = function checkIfUserLikedComment(commentId, userId) {
  var checkLike;
  return regeneratorRuntime.async(function checkIfUserLikedComment$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          checkLike = false;
          _context4.next = 3;
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
          return _context4.abrupt("return", checkLike);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var checkHowMuchLikes = function checkHowMuchLikes(commentId) {
  var likedAmount;
  return regeneratorRuntime.async(function checkHowMuchLikes$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
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
          return _context5.abrupt("return", likedAmount);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var handleNewComment = function handleNewComment(e, postID) {
  var user, userId, fName, lName, commentMessage, commentPrice;
  return regeneratorRuntime.async(function handleNewComment$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          e.preventDefault();
          _context7.next = 3;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 3:
          user = _context7.sent;
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
          }).then(function _callee4(data) {
            var url;
            return regeneratorRuntime.async(function _callee4$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!data.posted) {
                      _context6.next = 13;
                      break;
                    }

                    url = window.location.href;

                    if (!url.includes("posts")) {
                      _context6.next = 8;
                      break;
                    }

                    _context6.next = 5;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "תגובה פורסמה בהצלחה",
                      showConfirmButton: false,
                      timer: 1500
                    }));

                  case 5:
                    handleClickPost(postID);
                    _context6.next = 11;
                    break;

                  case 8:
                    _context6.next = 10;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "תגובה פורסמה בהצלחה",
                      showConfirmButton: false,
                      timer: 1500
                    }));

                  case 10:
                    location.reload();

                  case 11:
                    _context6.next = 15;
                    break;

                  case 13:
                    _context6.next = 15;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "אנא בדוק שכל השדות תקינים",
                      showConfirmButton: false,
                      timer: 1500
                    }));

                  case 15:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          });

        case 10:
        case "end":
          return _context7.stop();
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
      }).then(function _callee5(data) {
        return regeneratorRuntime.async(function _callee5$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!data.deleted) {
                  _context8.next = 4;
                  break;
                }

                _context8.next = 3;
                return regeneratorRuntime.awrap(Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "תגובה נמחקה בהצלחה",
                  showConfirmButton: false,
                  timer: 1500
                }));

              case 3:
                location.reload();

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        });
      });
    }
  });
};

var handleLikeComment = function handleLikeComment(commentId) {
  var user, userId;
  return regeneratorRuntime.async(function handleLikeComment$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 2:
          user = _context10.sent;
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
          }).then(function _callee6() {
            var likesAmount;
            return regeneratorRuntime.async(function _callee6$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return regeneratorRuntime.awrap(checkHowMuchLikes(commentId));

                  case 2:
                    likesAmount = _context9.sent;
                    document.querySelector(".likeComment-".concat(commentId)).innerHTML = "<span onclick=\"handleUnLikeComment('".concat(commentId, "')\" class=\"material-icons active center liked\" title=\"\u05D4\u05D5\u05E8\u05D3 \u05DC\u05D9\u05D9\u05E7\">favorite_border\n      </span><span class='likesAmount' >").concat(likesAmount, "</span>");

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

var handleUnLikeComment = function handleUnLikeComment(commentId) {
  var user, userId;
  return regeneratorRuntime.async(function handleUnLikeComment$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 2:
          user = _context12.sent;
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
          }).then(function _callee7() {
            var likesAmount;
            return regeneratorRuntime.async(function _callee7$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return regeneratorRuntime.awrap(checkHowMuchLikes(commentId));

                  case 2:
                    likesAmount = _context11.sent;
                    document.querySelector(".likeComment-".concat(commentId)).innerHTML = "<span onclick=\"handleLikeComment('".concat(commentId, "')\" class=\"material-icons active center unliked\" title=\"\u05DC\u05D9\u05D9\u05E7 \u05DC\u05EA\u05D2\u05D5\u05D1\u05D4\">favorite_border\n      </span><span class='likesAmount'>").concat(likesAmount, "</span>");

                  case 4:
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

var handleFavoritePost = function handleFavoritePost(postID) {
  var user, userId;
  return regeneratorRuntime.async(function handleFavoritePost$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 2:
          user = _context14.sent;
          userId = user.id;
          fetch("/posts/favorite/add", {
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
          }).then(function _callee8() {
            return regeneratorRuntime.async(function _callee8$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    document.querySelector(".fav-".concat(postID)).innerHTML = "<span class=\"material-icons fav\" onclick=\"handleDeleteFavoritePost('".concat(postID, "')\"> favorite </span><p>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</p>");
                    _context13.next = 3;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "פוסט נוסף למועדפים",
                      showConfirmButton: false,
                      timer: 1500
                    }));

                  case 3:
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

var handleDeleteFavoritePost = function handleDeleteFavoritePost(postID) {
  var user, userId;
  return regeneratorRuntime.async(function handleDeleteFavoritePost$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 2:
          user = _context16.sent;
          userId = user.id;
          fetch("/posts/favorite/delete", {
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
          }).then(function _callee9() {
            var url, params;
            return regeneratorRuntime.async(function _callee9$(_context15) {
              while (1) {
                switch (_context15.prev = _context15.next) {
                  case 0:
                    url = window.location.href;
                    params = url.split("?")[1];
                    document.querySelector(".fav-".concat(postID)).innerHTML = "<span class=\"material-icons notFav\" onclick=\"handleFavoritePost('".concat(postID, "')\"> favorite </span><p>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</p>");
                    _context15.next = 5;
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
                    return _context15.stop();
                }
              }
            });
          });

        case 5:
        case "end":
          return _context16.stop();
      }
    }
  });
};

var checkIfPostFavorite = function checkIfPostFavorite(postID, userId) {
  var checkFav;
  return regeneratorRuntime.async(function checkIfPostFavorite$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          checkFav = false;
          _context17.next = 3;
          return regeneratorRuntime.awrap(fetch("/posts/favorite/check", {
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
          return _context17.abrupt("return", checkFav);

        case 4:
        case "end":
          return _context17.stop();
      }
    }
  });
};