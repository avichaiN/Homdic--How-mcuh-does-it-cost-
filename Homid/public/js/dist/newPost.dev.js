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
}; // const hidePostBox = () =>{
//     postBox.style.opacity = '0'
//     postBox.style.transform = 'rotate3d(1, .5, .5, 180deg) scale(0.1);'
//     setTimeout(function(){ 
//         postBox.style.display = 'none'
//      }, 100);
// }


document.onclick = function (e) {
  className = e.srcElement.className;
  console.log(className);
  var classNameInclude = className.includes();

  if (className === 'newPostBox' || className === 'box') {
    console.log('box clicked');
  } else {
    console.log('not box');
  }
};

var getCategoiresCheckBox = function getCategoiresCheckBox() {
  var categoriesNames = "<option selected hidden>\u05D1\u05D7\u05E8 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05D4</option>";
  fetch('/category').then(function (res) {
    return res.json();
  }).then(function (data) {
    var categories = data.categories;
    categories.forEach(function (category) {
      categoriesNames += "<option data-id='".concat(category._id, "' value=\"").concat(category.Name, "\">").concat(category.Name, "</option>");
    });
    categoryCheckBox.innerHTML = categoriesNames;
  });
};