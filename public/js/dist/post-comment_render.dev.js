"use strict";

function buildOnePost(type
/*post or comment*/
, title, massage, PostImgSrc, postCreatedTime, whenMade, NmTimesViewed, numberOfComments, postID, fName, lName, isFavorite) {
  var img = "<img id=\"postImg\" src=\"data:image/jpg;base64,".concat(PostImgSrc, "\" alt=\"\" />");

  if (!PostImgSrc) {
    img = "";
  }

  var fullDate = new Date(postCreatedTime);
  var favoriteButton = "";
  /*  */

  var AddCommentButton = " <div id=\"AddCommentButton-".concat(postID, "\" class=\"Notifications show\" onclick=\"ShowAddComment('").concat(postID, "')\">\n    <span class=\"material-icons\">\n      add_comment\n    </span>");
  /*  */

  var TimesViewed = " <div id=\"TimesViewed\">\n    <span class=\"material-icons\"> visibility </span>\n    <p>\u05E0\u05E6\u05E4\u05D4 ".concat(NmTimesViewed, " \u05E4\u05E2\u05DE\u05D9\u05DD</p>\n  </div>");
  var leftButton;

  if (type == "post") {
    leftButton = AddCommentButton;
  } else {
    if (type == "comment") {
      leftButton = TimesViewed;
    } else {
      leftButton = "error wrong input type";
    }
  }

  if (isFavorite) {
    favoriteButton = "<span class=\"material-icons fav\" onclick=\"handleDeleteFavoritePost('".concat(postID, "')\"> star </span><p>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</p>");
  } else {
    favoriteButton = "<span class=\"material-icons\" onclick=\"handleFavoritePost('".concat(postID, "')\"> star </span><p>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</p>");
  }

  var sort = "def";
  /*  */

  var html = "<div class=\"post\" data-test='tt'>\n      <div data-id='".concat(postID, "' data-title='").concat(title, "' id=\"postheder\">\n    <p class='whenPosted' title='").concat(fullDate, "'>\u05DC\u05E4\u05E0\u05D9 ").concat(whenMade, "</p>\n    <p class=\"userInfo\">").concat(fName + " " + lName, "</p>\n      <h1 class=\"posttitle\">").concat(title, "</h1>\n      <p class=\"postbudy\">").concat(massage, "</p>\n      ").concat(img, "\n\n    </div>\n    <!--  add comment form -->\n    <div id=\"addComment-").concat(postID, "\" class=\"hide addComment\">\n      <!--hide -->     \n    </div>\n    <!--  end add comment form -->\n    <div class=\"futter\">\n      <div id=\"NotificationsButton\" class=\"Notifications commentArrow-").concat(postID, "\">\n        <span data-id='").concat(postID, "' data-comments='").concat(numberOfComments, "' onclick=\"handleGetComments('").concat(postID, "', '").concat(sort, "')\" class=\"material-icons\">arrow_downward</span>\n        <p data-id='").concat(postID, "' data-comments='").concat(numberOfComments, "' onclick=\"handleGetComments('").concat(postID, "', '").concat(sort, "')\">\u05EA\u05D2\u05D5\u05D1\u05D5\u05EA: ").concat(numberOfComments, "</p>\n      </div>\n      <div id=\"FavoriteButton\" class=\"Notifications fav-").concat(postID, "\">\n      ").concat(favoriteButton, "\n      </div>\n      <div id=\"cancelButton-").concat(postID, "\" class=\"Notifications hide\" onclick=\"HideAddComment('").concat(postID, "')\">\n        <span class=\"material-icons\">\n          add_circle_outline\n        </span>\n        <p>\u05D1\u05D8\u05DC</p>\n      </div>\n      <div id=\"leftButton\">\n      ").concat(leftButton, "\n        <p>\u05E8\u05E9\u05D5\u05DD \u05EA\u05D2\u05D5\u05D1\u05D4</p>\n      </div>\n      </div>\n      <div data-id='").concat(postID, "' data-title='").concat(title, "' class='deletePost' id='").concat(postID, "'></div>\n    </div>\n  </div>\n  <div class='sortComments sortComments-").concat(postID, "'>\n  <button onclick='sortCommentsByDate(\"").concat(postID, "\")'>\u05DC\u05E4\u05D9 \u05EA\u05D0\u05E8\u05D9\u05DA</button>\n  <button onclick='sortCommentsByLike(\"").concat(postID, "\")'>\u05DC\u05E4\u05D9 \u05DC\u05D9\u05D9\u05E7\u05D9\u05DD</button>\n  </div>\n  <div class='renderComment renderComment-").concat(postID, "'></div>\n  <div class=\"loadingComments loadingComments-").concat(postID, "\" data-title=\".dot-spin\">\n  <div class=\"dot-spin\"></div>\n</div>\n  <button class='closeComments closeComments-").concat(postID, "' onclick=\"handleHidePostsComments('").concat(postID, "')\">\u05D4\u05D7\u05D1\u05D0 \u05EA\u05D2\u05D5\u05D1\u05D5\u05EA \u05E9\u05DC \u05E4\u05D5\u05E1\u05D8 \u05D6\u05D4</button>");
  return html;
}

function buildOneComment(comment, price, fName, lName, commentCreatedTime, atTdate, commentId, liked, likesNum, isUsersComment) {
  var fullDate = new Date(commentCreatedTime);
  var deleteComment = "";

  if (isUsersComment) {
    deleteComment = "<button class='deletePostButton' onclick=\"handleDeleteComment('".concat(commentId, "')\">\u05DE\u05D7\u05E7 \u05EA\u05D2\u05D5\u05D1\u05D4</button>");
  }

  var likedButton = "";

  if (liked) {
    likedButton = "<span onclick=\"handleUnLikeComment('".concat(commentId, "')\" class=\"material-icons active center liked\" title=\"\u05D4\u05D5\u05E8\u05D3 \u05DC\u05D9\u05D9\u05E7\">favorite_border\n    </span>");
  } else {
    likedButton = "<span onclick=\"handleLikeComment('".concat(commentId, "')\" class=\"material-icons active center unliked\" title=\"\u05DC\u05D9\u05D9\u05E7 \u05DC\u05EA\u05D2\u05D5\u05D1\u05D4\">favorite_border\n    </span>");
  }

  var Html = "<article class=\"comment\">\n   <div ID=\"bodyComment\">\n     <p>\n      ".concat(comment, "\n     </p>\n     \u05DE\u05D7\u05D9\u05E8: ").concat(price, "\n   </div>\n   <div id=\"authRouter\">\n   <p title=\"").concat(fullDate, "\">\u05DC\u05E4\u05E0\u05D9 ").concat(atTdate, "</p>\n     <p>").concat(fName, " ").concat(lName, "</p>\n   </div>\n   <div data-id='").concat(commentId, "' class=\"deleteComment\">").concat(deleteComment, "</div>\n   <div id=\"likeComment\" class=\"likeComment-").concat(commentId, "\">\n   ").concat(likedButton, "\n   <span class='likesAmount'>").concat(likesNum, "</span>\n   </div>\n  </article>");
  return Html;
}

function renderPostsHeder(HederTitle, src) {
  document.querySelector("#categoryHeder").innerHTML = "<h1 class=\"headerTitle\">".concat(HederTitle, "</h1>\n    <img id=\"hederImg\" src=\"data:image/jpg;base64,").concat(src, "\" alt=\"\" />\n    <button onclick=\"displayPostBox(event)\" class=\"newPostButton\">\u05E4\u05D5\u05E1\u05D8 \u05D7\u05D3\u05E9</button>");
}

var renderNoPostsFound = function renderNoPostsFound(keywords) {
  document.querySelector("#categoryHeder").innerHTML = "<h1>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05D4\u05DB\u05D5\u05DC\u05DC\u05D9\u05DD: ".concat(keywords, "</h1>\n    <button onclick=\"displayPostBox(event)\" class=\"newPostButton\">\u05E4\u05D5\u05E1\u05D8 \u05D7\u05D3\u05E9</button>");
};

var renderSearchedPostsTitle = function renderSearchedPostsTitle(keywords) {
  document.querySelector("#categoryHeder").innerHTML = "<h1>\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D7\u05D9\u05E4\u05D5\u05E9 - ".concat(keywords, "</h1><br>\n    <button onclick=\"displayPostBox(event)\" class=\"newPostButton\">\u05E4\u05D5\u05E1\u05D8 \u05D7\u05D3\u05E9</button>");
};

var renderTitleFoundPostsUser = function renderTitleFoundPostsUser(name) {
  document.querySelector("#categoryHeder").innerHTML = "<h1>\u05E9\u05DC\u05D5\u05DD ".concat(name, ", \u05D4\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05E9\u05E4\u05D9\u05E8\u05E1\u05DE\u05EA:</h1>\n    <button onclick=\"displayPostBox(event)\" class=\"newPostButton\">\u05E4\u05D5\u05E1\u05D8 \u05D7\u05D3\u05E9</button>");
};

var renderTitlePostForAdmin = function renderTitlePostForAdmin(username) {
  document.querySelector("#categoryHeder").innerHTML = "<h2>\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05E9\u05DC \u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9: ".concat(username, "</h2>\n    <button onclick=\"displayPostBox(event)\" class=\"newPostButton\">\u05E4\u05D5\u05E1\u05D8 \u05D7\u05D3\u05E9</button>");
};

var renderTitlePostFavorits = function renderTitlePostFavorits() {
  document.querySelector("#categoryHeder").innerHTML = "<h1>\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</h1>";
};