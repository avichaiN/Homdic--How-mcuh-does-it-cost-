"use strict";

var canLoadMore = false;
var postsOnLoad;
var searchedPosts;
var blockLoadMore = true;

var getPosts = function getPosts() {
  var url, params;
  return regeneratorRuntime.async(function getPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.querySelector("#categoryHeder").style.visibility = "hidden";
          document.querySelector("#app").style.visibility = "hidden";
          document.querySelector("#loader").style.visibility = "visible";
          url = window.location.href;
          params = url.split("?")[1];

          if (!(params === undefined)) {
            _context.next = 9;
            break;
          }

          window.location.href = "Categories.html";
          _context.next = 30;
          break;

        case 9:
          if (!(params === "search")) {
            _context.next = 14;
            break;
          }

          searchedPosts = url.split("?")[2];
          skipLimitPostsBySearched(searchedPosts, 0);
          _context.next = 30;
          break;

        case 14:
          if (!(params === "myposts")) {
            _context.next = 18;
            break;
          }

          skipLimitPostsByUser(0);
          _context.next = 30;
          break;

        case 18:
          if (!(params === "myfavorites")) {
            _context.next = 22;
            break;
          }

          skipLimitPostsFavorite(0); // getUserFavorites()

          _context.next = 30;
          break;

        case 22:
          if (!params.includes("admin")) {
            _context.next = 26;
            break;
          }

          skipLimitPostsForAdminPage(params, 0);
          _context.next = 30;
          break;

        case 26:
          _context.next = 28;
          return regeneratorRuntime.awrap(numOfPostsAmountOnLoad(params));

        case 28:
          postsOnLoad = _context.sent;
          skipLimitPostsCategory(params, 0); // getPostsByCategory(params, 0)

        case 30:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getPostsBySearch = function getPostsBySearch(searchedPosts) {
  return regeneratorRuntime.async(function getPostsBySearch$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch("/posts/search/get/".concat(searchedPosts)).then(function (res) {
            return res.json();
          }).then(function _callee(data) {
            var keywords;
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    keywords = data.searchedSplitted;
                    foundPosts = data.foundPosts;

                    if (data.status === "unauthorized") {
                      window.location.href = "index.html";
                    } else {
                      if (foundPosts.length == 0) {
                        renderNoPostsFound(keywords);
                      } else {
                        renderSearchedPostsTitle(keywords);
                      }
                    }

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }));

        case 2:
          return _context3.abrupt("return", foundPosts);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getPostsByCategory = function getPostsByCategory(categoryId) {
  var foundPosts;
  return regeneratorRuntime.async(function getPostsByCategory$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // this is when user clicks category
          fetch("/category/".concat(categoryId)).then(function (res) {
            return res.json();
          }).then(function (data) {
            renderPostsHeder(data.categoryInfo[0].Name, data.categoryInfo[0].img);
          });
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetch("/posts/get/".concat(categoryId)).then(function (res) {
            return res.json();
          }).then(function _callee2(data) {
            return regeneratorRuntime.async(function _callee2$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (data.status === "unauthorized") {
                      window.location.href = "index.html";
                    } else {
                      foundPosts = data.foundPostsByCategoryId;
                    }

                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }));

        case 3:
          return _context5.abrupt("return", foundPosts);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var getPostsByUser = function getPostsByUser() {
  var userInfo, userFirstName, userId, foundPosts;
  return regeneratorRuntime.async(function getPostsByUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(getUserInfo());

        case 2:
          userInfo = _context7.sent;
          userFirstName = userInfo.fName;
          userId = userInfo.id;
          _context7.next = 7;
          return regeneratorRuntime.awrap(fetch("/posts/user/get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: userId
            })
          }).then(function (res) {
            return res.json();
          }).then(function _callee3(data) {
            return regeneratorRuntime.async(function _callee3$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (data.status === "unauthorized") {
                      window.location.href = "index.html";
                    } else {
                      if (!data.ok) {
                        console.log("err finding posts");
                      } else {
                        renderTitleFoundPostsUser(userFirstName);
                        foundPosts = data.foundPosts.reverse();
                      }
                    }

                  case 1:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          }));

        case 7:
          return _context7.abrupt("return", foundPosts);

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var getPostsUserIdForAdmin = function getPostsUserIdForAdmin(params) {
  var userId, foundPosts;
  return regeneratorRuntime.async(function getPostsUserIdForAdmin$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          userId = params.split("=")[1];
          _context8.next = 3;
          return regeneratorRuntime.awrap(fetch("/posts/admin/user/get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: userId
            })
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            if (!data.ok) {
              console.log("err finding posts");
            } else {
              var username = data.userInfo.username;
              renderTitlePostForAdmin(username);
              foundPosts = data.foundPosts;
            }
          }));

        case 3:
          return _context8.abrupt("return", foundPosts);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
};

var getUserFavorites = function getUserFavorites() {
  var user, userId, postsToDom;
  return regeneratorRuntime.async(function getUserFavorites$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 2:
          user = _context9.sent;
          userId = user.id;
          postsToDom = [];
          _context9.next = 7;
          return regeneratorRuntime.awrap(fetch("/posts/favorites/".concat(userId)).then(function (res) {
            return res.json();
          }).then(function (data) {
            if (data.status === "unauthorized") {
              window.location.href = "index.html";
            } else {
              renderTitlePostFavorits();
              var _foundPosts = data.favPosts;

              _foundPosts.forEach(function (post) {
                postsToDom.push(post[0]);
              });
            }
          }));

        case 7:
          return _context9.abrupt("return", postsToDom);

        case 8:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var checkHowMuchComments = function checkHowMuchComments(postId) {
  var comments;
  return regeneratorRuntime.async(function checkHowMuchComments$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(fetch("/comments/length", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              postId: postId
            })
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            if (data.status === "unauthorized") {
              window.location.href = "index.html";
            } else {
              comments = data.commentLength;
            }
          }));

        case 2:
          return _context10.abrupt("return", comments);

        case 3:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var getWhoPosted = function getWhoPosted(userId) {
  var fNamelName;
  return regeneratorRuntime.async(function getWhoPosted$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(fetch("/posts/user/".concat(userId)).then(function (res) {
            return res.json();
          }).then(function (data) {
            fNamelName = data.userFNameLName;
          }));

        case 2:
          return _context11.abrupt("return", fNamelName);

        case 3:
        case "end":
          return _context11.stop();
      }
    }
  });
};

var renderPosts = function renderPosts(postsArray) {
  var userInfo, userId, isAdmin, isFavorite, commentsLength, isUsersPost, postCreatedTime, timeAgo, _getUserWhoPosted, html;

  return regeneratorRuntime.async(function renderPosts$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(getUserInfo());

        case 2:
          userInfo = _context12.sent;
          userId = userInfo.id;
          isAdmin = false;
          _context12.next = 7;
          return regeneratorRuntime.awrap(handleCheckAdmin());

        case 7:
          isAdmin = _context12.sent;
          i = 0;

        case 9:
          if (!(i < postsArray.length)) {
            _context12.next = 29;
            break;
          }

          _context12.next = 12;
          return regeneratorRuntime.awrap(checkIfPostFavorite(postsArray[i]._id, userId));

        case 12:
          isFavorite = _context12.sent;
          _context12.next = 15;
          return regeneratorRuntime.awrap(checkHowMuchComments(postsArray[i]._id));

        case 15:
          commentsLength = _context12.sent;
          isUsersPost = false;
          postCreatedTime = Date.parse(postsArray[i].createdAt);
          timeAgo = timeSince(postCreatedTime);
          _context12.next = 21;
          return regeneratorRuntime.awrap(getWhoPosted(postsArray[i].publishedBy));

        case 21:
          _getUserWhoPosted = _context12.sent;

          if (postsArray[i].publishedBy === userId) {
            isUsersPost = true;
          }

          html = buildOnePost("post"
          /*post or comment*/
          , postsArray[i].title, postsArray[i].desc, postsArray[i].img, postCreatedTime, timeAgo, "0", commentsLength, postsArray[i]._id, _getUserWhoPosted.fName, _getUserWhoPosted.lName, isFavorite);
          document.getElementById("app").innerHTML += html;

          if (isUsersPost || isAdmin) {
            document.getElementById("".concat(postsArray[i]._id)).innerHTML = "<button class='deletePostButton' style=\"display:block;\" onclick=\"handleDeletePost(event)\">\u05DE\u05D7\u05E7 \u05E4\u05D5\u05E1\u05D8</button>";
          }

        case 26:
          i++;
          _context12.next = 9;
          break;

        case 29:
          document.querySelector("#loader").style.display = "none";
          document.querySelector("#categoryHeder").style.visibility = "visible";
          document.querySelector("#app").style.visibility = "visible";
          setTimeout(function () {
            canLoadMore = true;
            blockLoadMore = false;
          }, 50);

        case 33:
        case "end":
          return _context12.stop();
      }
    }
  });
}; // getPostsByCategory


var getCurrentCategory = function getCurrentCategory() {
  var url = window.location.href;
  var categoryId = url.split("?")[1];
  return categoryId;
};

var numOfPostsAmountOnLoad = function numOfPostsAmountOnLoad(id) {
  var numOfPostsAmountOnLoad;
  return regeneratorRuntime.async(function numOfPostsAmountOnLoad$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(fetch("/posts/get/".concat(id)).then(function (res) {
            return res.json();
          }).then(function _callee4(data) {
            return regeneratorRuntime.async(function _callee4$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    if (data.status === "unauthorized") {
                      window.location.href = "index.html";
                    } else {
                      numOfPostsAmountOnLoad = data.foundPostsByCategoryId.length;
                    }

                  case 1:
                  case "end":
                    return _context13.stop();
                }
              }
            });
          }));

        case 2:
          return _context14.abrupt("return", numOfPostsAmountOnLoad);

        case 3:
        case "end":
          return _context14.stop();
      }
    }
  });
};

var skipLimitPostsCategory = function skipLimitPostsCategory(categoryId, skip) {
  var foundPosts, popNewPosts, sortedPosts;
  return regeneratorRuntime.async(function skipLimitPostsCategory$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          canLoadMore = false;
          _context15.next = 3;
          return regeneratorRuntime.awrap(getPostsByCategory(categoryId));

        case 3:
          foundPosts = _context15.sent;
          popNewPosts = foundPosts.length - postsOnLoad;
          foundPosts.reverse();
          sortedPosts = foundPosts.slice(skip + popNewPosts, popNewPosts + skip + 10);
          renderPosts(sortedPosts);

        case 8:
        case "end":
          return _context15.stop();
      }
    }
  });
};

var skipLimitPostsByUser = function skipLimitPostsByUser(skip) {
  var foundPosts, sortedPosts;
  return regeneratorRuntime.async(function skipLimitPostsByUser$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          canLoadMore = false;
          _context16.next = 3;
          return regeneratorRuntime.awrap(getPostsByUser());

        case 3:
          foundPosts = _context16.sent;
          sortedPosts = foundPosts.slice(skip, skip + 10);
          renderPosts(sortedPosts);

        case 6:
        case "end":
          return _context16.stop();
      }
    }
  });
};

var skipLimitPostsFavorite = function skipLimitPostsFavorite(skip) {
  var foundPosts, sortedPostsSkip;
  return regeneratorRuntime.async(function skipLimitPostsFavorite$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          canLoadMore = false;
          _context17.next = 3;
          return regeneratorRuntime.awrap(getUserFavorites());

        case 3:
          foundPosts = _context17.sent;
          foundPosts.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          sortedPostsSkip = foundPosts.slice(skip, skip + 10);
          renderPosts(sortedPostsSkip);

        case 7:
        case "end":
          return _context17.stop();
      }
    }
  });
};

var skipLimitPostsBySearched = function skipLimitPostsBySearched(searchedWords, skip) {
  var foundPosts, sortedPostsSkip;
  return regeneratorRuntime.async(function skipLimitPostsBySearched$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          canLoadMore = false;
          _context18.next = 3;
          return regeneratorRuntime.awrap(getPostsBySearch(searchedWords, skip));

        case 3:
          foundPosts = _context18.sent;
          foundPosts.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          sortedPostsSkip = foundPosts.slice(skip, skip + 10);
          renderPosts(sortedPostsSkip);

        case 7:
        case "end":
          return _context18.stop();
      }
    }
  });
};

var skipLimitPostsForAdminPage = function skipLimitPostsForAdminPage(params, skip) {
  var foundPosts, sortedPosts;
  return regeneratorRuntime.async(function skipLimitPostsForAdminPage$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          canLoadMore = false;
          _context19.next = 3;
          return regeneratorRuntime.awrap(getPostsUserIdForAdmin(params));

        case 3:
          foundPosts = _context19.sent;
          foundPosts.reverse();
          sortedPosts = foundPosts.slice(skip, skip + 10);
          renderPosts(sortedPosts);

        case 7:
        case "end":
          return _context19.stop();
      }
    }
  });
};

var loadMoreOnBottom = function () {
  return function (currentCategory, howMuchToSkip) {
    if (!blockLoadMore) {
      blockLoadMore = true;
      var url = window.location.href;
      var params = url.split("?")[1];

      if (params === "myposts") {
        skipLimitPostsByUser(howMuchToSkip);
      } else if (params === "myfavorites") {
        skipLimitPostsFavorite(howMuchToSkip);
      } else if (params.includes("admin")) {
        skipLimitPostsForAdminPage(params, howMuchToSkip);
      } else if (params === "search") {
        skipLimitPostsBySearched(searchedPosts, howMuchToSkip);
      } else {
        skipLimitPostsCategory(currentCategory, howMuchToSkip);
      }
    }
  };
}();

window.onscroll = function () {
  if (canLoadMore) {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 650) {
      var howMuchToSkip = document.getElementsByClassName("post").length;
      var currentCategory = getCurrentCategory();
      loadMoreOnBottom(currentCategory, howMuchToSkip);
    }
  }
};