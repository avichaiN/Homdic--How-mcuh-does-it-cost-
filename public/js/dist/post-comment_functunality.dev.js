"use strict";

function HideAddComment(postID) {
  console.log(postID);
  document.querySelector("#AddCommentButton-".concat(postID)).classList.replace('hide', 'show');
  document.querySelector("#cancelButton-".concat(postID)).classList.replace('show', 'hide');
  document.querySelector("#addComment-".concat(postID)).classList.replace('show', 'hide');
}

function ShowAddComment(postID) {
  document.querySelector("#addComment-".concat(postID)).innerHTML = "<div>\n    <p>\u05D4\u05D5\u05E1\u05E3 \u05EA\u05D2\u05D5\u05D1\u05D4</p>\n    <form onsubmit='handleNewComment(event)'>\n      <textarea style='resize: none;' name=\"message\"></textarea>\n      <input type='text' placeholder='\u05DE\u05D7\u05D9\u05E8'>\n      <input type=\"button\" value=\"\u05E9\u05DC\u05D7\">\n    </form>\n  </div>";
  document.querySelector("#AddCommentButton-".concat(postID)).classList.replace('show', 'hide');
  document.querySelector("#cancelButton-".concat(postID)).classList.replace('hide', 'show');
  document.querySelector("#addComment-".concat(postID)).classList.replace('hide', 'show');
}

function PostFavoriteButtonClicked() {
  document.querySelector('#FavoriteButton').classList.toggle('Toggled');
} // delete post user/admin


var handleDeletePost = function handleDeletePost(e) {
  var postId = e.target.parentNode.dataset.id;
  var postTitle = e.target.parentNode.dataset.title;
  Swal.fire({
    title: 'האם את/ה בטוח/ה?',
    html: "\u05DB\u05D5\u05EA\u05E8\u05EA \u05E4\u05D5\u05E1\u05D8 \u05E9\u05E0\u05D1\u05D7\u05E8: ".concat(postTitle, "<br>\u05DC\u05D0 \u05D9\u05D4\u05D9\u05D4 \u05D0\u05E4\u05E9\u05E8 \u05DC\u05E9\u05D7\u05D6\u05E8 \u05DE\u05D9\u05D3\u05E2 \u05D6\u05D4!"),
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: "לא, בטל!",
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'כן, מחק פוסט!'
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
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!data.deleted) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return regeneratorRuntime.awrap(Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "פוסט נמחק בהצלחה",
                  showConfirmButton: false,
                  timer: 1000
                }));

              case 3:
                location.reload();
                _context.next = 7;
                break;

              case 6:
                alert('תקלה במחיקת פוסט');

              case 7:
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
  var postId = url.split('?')[1];
  fetch("/comments/".concat(postId)).then(function (res) {
    return res.json();
  }).then(function _callee2(data) {
    var post, comments;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (data.status === "unauthorized") {
              window.location.href = "index.html";
            } else {
              post = data.post;
              comments = data.comments;
              /*  buildOnePost(
                 "comment",
                 title,
                 massage,
                 PostImgSrc,
                 NmTimesViewed,
                 numberOfComments,
                 postID,
                 fName,
                 lName
               ) */

              /*   buildOneComment(comment, postedBy, atTdate) */

              /* buildOneComment */

              console.log('Post info:');
              console.log(post);
              console.log('Post Comments:');
              console.log(comments);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};

var handleNewComment = function handleNewComment(e) {
  e.preventDefault();
  console.log(e);
};