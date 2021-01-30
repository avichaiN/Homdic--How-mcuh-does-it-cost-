"use strict";

var getPosts = function getPosts() {
  document.querySelector("#categoryHeder").style.visibility = "hidden";
  document.querySelector("#app").style.visibility = "hidden";
  document.querySelector("#loader").style.visibility = "visible";
  var url = window.location.href;
  var params = url.split('?')[1];

  if (params === 'search') {
    var searchedPosts = url.split('?')[2];
    getPostsBySearch(searchedPosts);
  } else if (params === 'myposts') {
    getPostsByUser();
  } else if (params === 'myfavorites') {
    getUserFavorites();
  } else if (params.includes('admin')) {
    getPostsUserIdForAdmin(params);
  } else {
    getPostsByCategory(params);
  }
};

var getPostsBySearch = function getPostsBySearch(searchedPosts) {
  fetch("/posts/search/get/".concat(searchedPosts)).then(function (res) {
    return res.json();
  }).then(function _callee(data) {
    var keywords, foundPosts;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
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

              renderPosts(foundPosts);
            }

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

var getPostsByCategory = function getPostsByCategory(categoryId) {
  // this is when user clicks category
  fetch("/category/byid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      categoryId: categoryId
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    renderPostsHeder(data.categoryInfo[0].Name, data.categoryInfo[0].img);
  }); // this is when looking for category id

  fetch("/posts/get/".concat(categoryId)).then(function (res) {
    return res.json();
  }).then(function _callee2(data) {
    var foundPosts;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (data.status === "unauthorized") {
              window.location.href = "index.html";
            } else {
              foundPosts = data.foundPostsByCategoryId;
              renderPosts(foundPosts);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};

var getPostsByUser = function getPostsByUser() {
  var userInfo, userFirstName, userId;
  return regeneratorRuntime.async(function getPostsByUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(getUserInfo());

        case 2:
          userInfo = _context4.sent;
          userFirstName = userInfo.fName;
          userId = userInfo.id;
          fetch("/posts/user/get", {
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
            var foundPosts;
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (data.status === "unauthorized") {
                      window.location.href = "index.html";
                    } else {
                      if (!data.ok) {
                        console.log('err finding posts');
                      } else {
                        renderTitleFoundPostsUser(userFirstName);
                        foundPosts = data.foundPosts;
                        renderPosts(foundPosts);
                      }
                    }

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var getPostsUserIdForAdmin = function getPostsUserIdForAdmin(params) {
  var userId = params.split('=')[1]; // let userInfo = await userInfoById(userId)

  fetch("/posts/admin/user/get", {
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
      console.log('err finding posts');
    } else {
      var username = data.userInfo.username;
      renderTitlePostForAdmin(username);
      var foundPosts = data.foundPosts;
      renderPosts(foundPosts);
    }
  });
};

var getUserFavorites = function getUserFavorites() {
  var user, userId;
  return regeneratorRuntime.async(function getUserFavorites$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 2:
          user = _context5.sent;
          userId = user.id;
          fetch("/posts/favorites/getall", {
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
            if (data.status === "unauthorized") {
              window.location.href = "index.html";
            } else {
              var postsToDom = [];
              renderTitlePostFavorits();
              var foundPosts = data.favPosts;
              foundPosts.forEach(function (post) {
                postsToDom.push(post[0]);
              });
              renderPosts(postsToDom);
            }
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var checkHowMuchComments = function checkHowMuchComments(postId) {
  var comments;
  return regeneratorRuntime.async(function checkHowMuchComments$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
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
          return _context6.abrupt("return", comments);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var renderPosts = function renderPosts(postsArray) {
  var userInfo, userId, isAdmin, sortedPosts, isFavorite, commentsLength, isUsersPost, postCreatedTime, timeAgo, html;
  return regeneratorRuntime.async(function renderPosts$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(getUserInfo());

        case 2:
          userInfo = _context7.sent;
          userId = userInfo.id;
          isAdmin = false;
          _context7.next = 7;
          return regeneratorRuntime.awrap(handleCheckAdmin());

        case 7:
          isAdmin = _context7.sent;
          sortedPosts = postsArray.reverse();
          i = 0;

        case 10:
          if (!(i < sortedPosts.length)) {
            _context7.next = 27;
            break;
          }

          _context7.next = 13;
          return regeneratorRuntime.awrap(checkIfPostFavorite(sortedPosts[i]._id, userId));

        case 13:
          isFavorite = _context7.sent;
          _context7.next = 16;
          return regeneratorRuntime.awrap(checkHowMuchComments(sortedPosts[i]._id));

        case 16:
          commentsLength = _context7.sent;
          isUsersPost = false;
          postCreatedTime = Date.parse(sortedPosts[i].createdAt);
          timeAgo = timeSince(postCreatedTime);

          if (sortedPosts[i].publishedBy === userId) {
            isUsersPost = true;
          }

          html = buildOnePost("post"
          /*post or comment*/
          , sortedPosts[i].title, sortedPosts[i].desc, sortedPosts[i].img, postCreatedTime, timeAgo, "0", commentsLength, sortedPosts[i]._id, sortedPosts[i].fName, sortedPosts[i].lName, isFavorite);
          document.getElementById('app').innerHTML += html;

          if (isUsersPost || isAdmin) {
            document.getElementById("".concat(sortedPosts[i]._id)).innerHTML = "<button class='deletePostButton' style=\"display:block;\" onclick=\"handleDeletePost(event)\">\u05DE\u05D7\u05E7 \u05E4\u05D5\u05E1\u05D8</button>";
          }

        case 24:
          i++;
          _context7.next = 10;
          break;

        case 27:
          document.querySelector("#loader").style.display = "none";
          document.querySelector("#categoryHeder").style.visibility = "visible";
          document.querySelector("#app").style.visibility = "visible";

        case 30:
        case "end":
          return _context7.stop();
      }
    }
  });
};