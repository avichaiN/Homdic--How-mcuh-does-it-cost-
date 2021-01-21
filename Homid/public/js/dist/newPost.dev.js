"use strict";

var postBox = document.querySelector('.newPostBox');
var categoryCheckBox = document.getElementById('category');

var displayPostBox = function displayPostBox(e) {
  e.stopPropagation();
  postBox.style.display = 'block';
  setTimeout(function () {
    postBox.style.opacity = '1';
    postBox.style.transform = 'none';
    getCategoiresCheckBox();
  }, 100);
};

var hideNewPostBox = function hideNewPostBox(e) {
  postBox.style.opacity = '0';
  postBox.style.transform = 'rotate3d(1, .5, .5, 180deg) scale(0.1)';
  setTimeout(function () {
    postBox.style.display = 'none';
  }, 100);
};

document.onclick = function (e) {
  className = e.target.className;
  var classNameInclude = className.includes('box');

  if (!classNameInclude) {
    hideNewPostBox();
  }
};

var getCategoiresCheckBox = function getCategoiresCheckBox() {
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
  var id;
  return regeneratorRuntime.async(function getUserWhoPosted$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = '';
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("/userInfo").then(function (res) {
            return res.json();
          }).then(function (data) {
            id = data.decoded.id;
          }));

        case 3:
          return _context.abrupt("return", id);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var handleNewPost = function handleNewPost(e) {
  var user, categoryId, title, desc, img;
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

          if (categoryId === 'choseCategory') {
            document.querySelector('.mustChoose').style.display = 'block';
            console.log('must chose a cateogry');
          } else {
            document.querySelector('.mustChoose').style.display = 'none';
            fetch("/post", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                user: user,
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
                        position: "top-center",
                        icon: "error",
                        title: "תקלה בהוספת פוסט",
                        showConfirmButton: false,
                        timer: 800
                      }));

                    case 3:
                      _context2.next = 8;
                      break;

                    case 5:
                      _context2.next = 7;
                      return regeneratorRuntime.awrap(Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "פוסט פורסם בהצלחה",
                        showConfirmButton: false,
                        timer: 3000
                      }));

                    case 7:
                      hideNewPostBox(); // here re locate to posts with category id

                    case 8:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
          }

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
};