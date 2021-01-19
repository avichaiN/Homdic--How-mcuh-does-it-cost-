"use strict";

renderOnePost("fff", "shdhd", "shgdfhgds");

function renderpostsPage() {
  document.getElementById("app").innerHTML = "";
}

function renderOnePost(title, massage, postID) {
  document.getElementById("app").innerHTML += "<div class=\"post\">\n    <div id=\"postheder\">\n      <h1 class=\"posttitle\">".concat(title, "</h1>\n      <p class=\"postbudy\">").concat(massage, "</p>\n    </div>\n    <!--  add comment form -->\n    <div id=\"addComment\" class=\"hide\">\n\n      <!--hide -->\n      <div>\n        <p>\u05D4\u05D5\u05E1\u05E3 \u05EA\u05D2\u05D5\u05D1\u05D4</p>\n        <form action=\"\">\n          <textarea name=\"message\"></textarea>\n          <input type=\"button\" value=\"\u05E9\u05DC\u05D7\">\n        </form>\n      </div>\n\n    </div>\n    <!--  end add comment form -->\n    <div class=\"futter\">\n      <div id=\"NotificationsButton\" class=\"Notifications\" onclick=\"PostNotificationsButtonClicked()\">\n        <span class=\"material-icons\"> notifications </span>\n        <p>\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA</p>\n      </div>\n      <div id=\"FavoriteButton\" class=\"Notifications\" onclick=\"PostFavoriteButtonClicked()\">\n        <span class=\"material-icons\"> favorite </span>\n        <p>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</p>\n      </div>\n      <div id=\"cancelButton\" class=\"Notifications hide\" onclick=\"HideAddComment()\">\n        <span class=\"material-icons\">\n          add_circle_outline\n        </span>\n        <p>\u05D1\u05D8\u05DC</p>\n      </div>\n      <div id=\"AddCommentButton\" class=\"Notifications show\" onclick=\"ShowAddComment()\">\n        <span class=\"material-icons\">\n          add_circle_outline\n        </span>\n        <p>\u05E8\u05E9\u05D5\u05DD \u05EA\u05D2\u05D5\u05D1\u05D4</p>\n      </div>\n    </div>\n  </div>");
}

function rendercomments() {}