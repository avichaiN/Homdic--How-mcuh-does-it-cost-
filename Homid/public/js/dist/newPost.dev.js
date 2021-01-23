"use strict";

var displayPostBox = function displayPostBox(e) {
  var postBox = document.querySelector('.newPostBox');
  e.stopPropagation();
  postBox.style.display = 'block';
  setTimeout(function () {
    postBox.style.opacity = '1';
    postBox.style.transform = 'none';
    getCategoiresCheckBox();
  }, 100);
};

var hideNewPostBox = function hideNewPostBox() {
  var postBox = document.querySelector('.newPostBox');
  postBox.style.opacity = '0';
  postBox.style.transform = 'rotate3d(1, .5, .5, 180deg) scale(0.1)';
  setTimeout(function () {
    postBox.style.display = 'none';
  }, 100);
}; // document.onclick = function (e) {
//     className = e.target.className
//     const classNameInclude = className.includes('box')
//     if (!classNameInclude) {
//         hideNewPostBox()
//     }
// }


var getCategoiresCheckBox = function getCategoiresCheckBox() {
  var categoryCheckBox = document.getElementById('category');
  var categoriesNames = "<option selected value='choseCategory' hidden>\u05D1\u05D7\u05E8 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05D4</option>";
  fetch('/category/get').then(function (res) {
    return res.json();
  }).then(function (data) {
    var categories = data.categories;
    categories.forEach(function (category) {
      categoriesNames += "<option data-id='".concat(category._id, "' value=\"").concat(category._id, "\">").concat(category.Name, "</option>");
    });
    categoryCheckBox.innerHTML = categoriesNames;
  });
};

var getUserWhoPosted = function getUserWhoPosted() {
  var user;
  return regeneratorRuntime.async(function getUserWhoPosted$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = '';
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("/userInfo").then(function (res) {
            return res.json();
          }).then(function (data) {
            user = data.decoded;
          }));

        case 3:
          return _context.abrupt("return", user);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var handleNewPost = function handleNewPost(e) {
  var user, categoryId, title, desc, img, userId, userFname, userLname;
  return regeneratorRuntime.async(function handleNewPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          e.preventDefault();
          _context3.next = 3;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 3:
          user = _context3.sent;
          categoryId = e.target.children.category.value;
          title = e.target.children.title.value;
          desc = e.target.children.desc.value;
          img = e.target.children.img.value;
          userId = user.id;
          userFname = user.fName;
          userLname = user.lName;

          if (categoryId === 'choseCategory') {
            categoryId = "רכבים";
            /* undefined */
          }

          fetch("/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: userId,
              userFname: userFname,
              userLname: userLname,
              categoryId: categoryId,
              title: title,
              desc: desc,
              img: img
            })
          }).then(function (res) {
            return res.json();
          }).then(function _callee(data) {
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (data.posted) {
                      _context2.next = 5;
                      break;
                    }

                    _context2.next = 3;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "אנא לבדוק שכל השדות תקינות",
                      showConfirmButton: false,
                      timer: 1300
                    }));

                  case 3:
                    _context2.next = 9;
                    break;

                  case 5:
                    _context2.next = 7;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "פוסט פורסם בהצלחה",
                      showConfirmButton: false,
                      timer: 2000
                    }));

                  case 7:
                    hideNewPostBox();
                    window.location.href = "/posts.html?".concat(categoryId);

                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
};