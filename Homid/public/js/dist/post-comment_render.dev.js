"use strict";

function renderpostsPage() {
  document.getElementById("app").innerHTML = "";
}

function renderOnePost(taitle, massage, postID) {
  document.getElementById("app").innerHTML = " <div class=\"post\">\n    <div id=\"postheder\">\n      <h1 class=\"posttitle\">\u05DE\u05D6\u05D2\u05DF</h1>\n      <p class=\"postbudy\">\u05DE\u05E2\u05D5\u05E0\u05D9\u05D9\u05DF \u05D1\u05DE\u05EA\u05E7\u05D9\u05DF \u05DC\u05DE\u05D6\u05D2\u05DF</p>\n    </div>\n    <div class=\"futter\">\n      <div>\n        <span class=\"material-icons\"> notifications </span>\n        <p>\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA</p>\n      </div>\n      <div>\n        <span class=\"material-icons\"> info </span>\n        <p>\u05DE\u05D9\u05D3\u05E2</p>\n      </div>\n      <div>\n        <span class=\"material-icons\"> favorite </span>\n        <p>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</p>\n      </div>\n    </div>\n  </div>";
}

function rendercomments() {}