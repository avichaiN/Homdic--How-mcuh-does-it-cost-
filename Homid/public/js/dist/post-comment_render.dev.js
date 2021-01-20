"use strict";

var type = "post";
var massage = "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיע";
var title = "מזגן";
var NmTimesViewed = "36";
var postID = "sklgkh78h89xchv";
renderOnePost(type
/*post or comment*/
, title, massage, NmTimesViewed, postID);

function renderpostsPage() {
  document.getElementById("app").innerHTML = "";
}

function renderOnePost(type
/*post or comment*/
, title, massage, NmTimesViewed, postID) {
  var AddCommentButton = " <div id=\"AddCommentButton\" class=\"Notifications show\" onclick=\"ShowAddComment()\">\n    <span class=\"material-icons\">\n      add_circle_outline\n    </span>";
  var TimesViewed = " <div id=\"TimesViewed\">\n    <span class=\"material-icons\"> visibility </span>\n    <p>\u05E0\u05E6\u05E4\u05D4 ".concat(NmTimesViewed, " \u05E4\u05E2\u05DE\u05D9\u05DD</p>\n  </div>");
  var leftButton;

  if (type == "post") {
    leftButton = AddCommentButton;
  } else {
    if (type == "comment") {
      leftButton = TimesViewed;
    } else {
      leftButton = "error rong input type";
    }
  }

  document.getElementById("app").innerHTML += "<div class=\"post\">\n    <div id=\"postheder\">\n      <h1 class=\"posttitle\">".concat(title, "</h1>\n      <p class=\"postbudy\">").concat(massage, "</p>\n    </div>\n    <!--  add comment form -->\n    <div id=\"addComment\" class=\"hide\">\n      <!--hide -->     \n    </div>\n    <!--  end add comment form -->\n    <div class=\"futter\">\n      <div id=\"NotificationsButton\" class=\"Notifications\" onclick=\"PostNotificationsButtonClicked()\">\n        <span class=\"material-icons\"> notifications </span>\n        <p>\u05EA\u05D6\u05DB\u05D5\u05E8\u05EA</p>\n      </div>\n      <div id=\"FavoriteButton\" class=\"Notifications\" onclick=\"PostFavoriteButtonClicked()\">\n        <span class=\"material-icons\"> favorite </span>\n        <p>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</p>\n      </div>\n      <div id=\"cancelButton\" class=\"Notifications hide\" onclick=\"HideAddComment()\">\n        <span class=\"material-icons\">\n          add_circle_outline\n        </span>\n        <p>\u05D1\u05D8\u05DC</p>\n      </div>\n      <div id=\"leftButton\">\n      ").concat(leftButton, "\n        <p>\u05E8\u05E9\u05D5\u05DD \u05EA\u05D2\u05D5\u05D1\u05D4</p>\n      </div>\n      </div>\n    </div>\n  </div>");
}

function rendercomments() {}