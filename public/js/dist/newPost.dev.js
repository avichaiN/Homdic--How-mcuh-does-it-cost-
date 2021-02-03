"use strict";

var HtmlNewPostForm = function HtmlNewPostForm() {
  var html = "<img class='closeNewPost' onclick=\"hideNewPostBox()\" src=\"https://www.freeiconspng.com/thumbs/close-button-png/black-circle-close-button-png-5.png\">\n  <h1 class='box'>\u05E4\u05D5\u05E1\u05D8 \u05D7\u05D3\u05E9</h1>\n  <form class='box' enctype=\"multipart/form-data\" onsubmit=\"handleNewPost(event)\">\n      <label class=\"box mustChoose\">\u05D7\u05D9\u05D9\u05D1 \u05DC\u05D1\u05D7\u05D5\u05E8 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4</label>\n      <select required name='category' class='box' id=\"category\" name=\"category\"></select>\n      <label class='box' required for=\"title\">\u05DB\u05D5\u05EA\u05E8\u05EA</label>\n      <input class='box' name=\"title\" required placeholder='\u05DB\u05D5\u05EA\u05E8\u05EA' type=\"text\" maxlength=\"45\" id=\"title\">\n      <label class='box' for=\"desc\">\u05E9\u05D0\u05DC\u05D4</label>\n      <textarea class='box' name=\"desc\" required placeholder='\u05EA\u05D9\u05D0\u05D5\u05E8 \u05D4\u05E9\u05D0\u05DC\u05D4' maxlength=\"250\" id='desc' type=\"text\"></textarea>\n      <label class='img box' name='imgLable' for=\"img\">\u05D4\u05E2\u05DC\u05D4 \u05EA\u05DE\u05D5\u05E0\u05D4</label>\n      <input class='box imgUpload' onchange='handleImgSelect()' id='img' type=\"file\" style=\"visibility:hidden;display: none;\" name=\"img\" accept=\"image/*\">\n      <span class='box' id=\"file-chosen\"></span>\n      <input class='box' type=\"submit\" value=\"\u05E4\u05E8\u05E1\u05DD\">\n  </form> ";
  return html;
};

var displayPostBox = function displayPostBox(e) {
  e.stopPropagation();
  var postBox = document.querySelector(".newPostBox");
  postBox.innerHTML = HtmlNewPostForm();
  postBox.style.display = "block";
  setTimeout(function () {
    postBox.style.opacity = "1";
    postBox.style.transform = "none";
    getCategoiresCheckBox();
  }, 100);
};

var hideNewPostBox = function hideNewPostBox() {
  var postBox = document.querySelector(".newPostBox");
  postBox.style.opacity = "0";
  postBox.style.transform = "rotate3d(1, .5, .5, 180deg) scale(0.1)";
  setTimeout(function () {
    postBox.style.display = "none";
  }, 100);
};

var handleImgSelect = function handleImgSelect() {
  var imgUpload = document.querySelector(".imgUpload");
  var fileChosen = document.querySelector("#file-chosen");
  fileChosen.textContent = imgUpload.files[0].name;
};

var getCategoiresCheckBox = function getCategoiresCheckBox() {
  var categoryCheckBox = document.getElementById("category");
  var categoriesNames = "<option selected value='choseCategory' hidden>\u05D1\u05D7\u05E8 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05D4</option>";
  fetch("/category/get").then(function (res) {
    return res.json();
  }).then(function (data) {
    var categories = data.categories;
    categories.forEach(function (category) {
      categoriesNames += "<option data-id='".concat(category._id, "' value=\"").concat(category._id, "\">").concat(category.Name, "</option>");
    });
    categoryCheckBox.innerHTML = categoriesNames;
  });
};

var handleNewPost = function handleNewPost(e, file) {
  var user, categoryId, title, desc, img, userId, imgFile, newSentenc, wordsArry, formData;
  return regeneratorRuntime.async(function handleNewPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          e.preventDefault();
          _context2.next = 3;
          return regeneratorRuntime.awrap(getUserWhoPosted());

        case 3:
          user = _context2.sent;
          categoryId = e.target.children.category.value;
          title = e.target.children.title.value;
          desc = e.target.children.desc.value;
          img = e.target.children.img;
          userId = user.id;
          imgFile = img.files[0];
          newSentenc = '';
          wordsArry = desc.split(" ");
          wordsArry.forEach(function (word) {
            if (word.length > 11) {
              newSentenc += ' מילה ארוכה ';
            } else {
              newSentenc += word;
            }

            desc = newSentenc;
          }); // wordsArry.forEach(word = () => {
          //   if (word.length > 20) {
          //     newSentenc += 'X';
          //   } else {
          //     newSentenc += word;
          //   }
          //   desc = newSentenc;
          // })

          if (categoryId === "choseCategory") {
            categoryId = undefined;
          }

          formData = new FormData();
          formData.append('categoryId', categoryId);
          formData.append('title', title);
          formData.append('desc', desc);
          formData.append('userId', userId);

          if (imgFile) {
            formData.append('img', imgFile, imgFile.name);
          }

          fetch("/posts", {
            method: "POST",
            headers: {},
            body: formData
          }).then(function (res) {
            return res.json();
          }).then(function _callee(data) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (data.posted) {
                      _context.next = 5;
                      break;
                    }

                    _context.next = 3;
                    return regeneratorRuntime.awrap(Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "אנא בדוק שכל השדות תקינים",
                      showConfirmButton: false,
                      timer: 1500
                    }));

                  case 3:
                    _context.next = 9;
                    break;

                  case 5:
                    _context.next = 7;
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
                    return _context.stop();
                }
              }
            });
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  });
};