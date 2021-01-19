"use strict";

var startLoad = function startLoad() {
  getDisplayCategories();
  getUserInfo();
  displayAdminCategory();
  displayGoToAdminPage();
}; // get all categories when loading page


var getDisplayCategories = function getDisplayCategories() {
  fetch("/category").then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.status === "unauthorized") {
      window.location.replace("index.html");
    } else {
      var categories = data.categories;
      writeCategoiresToDom(categories);
    }
  });
};

var writeCategoiresToDom = function writeCategoiresToDom(categories) {
  var categoryDiv = document.querySelector(".cateogryPage__categorys");
  var categoriesHtml = "";
  categories.forEach(function (category) {
    categoriesHtml += "<div onclick=\"goToClickedCategory(event)\" class=\"cateogryPage__categorysBox\" data-name='".concat(category.Name, "' data-id='").concat(category._id, "'>\n        <img src=\"").concat(category.Img, "\">\n        <div class=\"cateogryPage__categorysBoxContainer\" data-img='").concat(category.Img, "' data-name='").concat(category.Name, "' data-id='").concat(category._id, "'>\n            <p>").concat(category.Name, "</p>\n            <button onclick='deleteCategory(event)' style=\"display: none;\" class=\"deleteCategory\">\u05DE\u05D7\u05E7</button>\n            <!-- add menu of edit cateogry -->\n            <button onclick='editCategoryForm(event)' style=\"display: none;\" class=\"editCategory\">\u05E2\u05E8\u05D5\u05DA</button>\n        </div>\n    </div>");
  });
  categoryDiv.innerHTML = categoriesHtml;
}; // go to clicked category


var goToClickedCategory = function goToClickedCategory(e) {
  var chosenCategoryId = e.target.dataset.id;

  if (chosenCategoryId === undefined) {
    chosenCategoryId = e.target.parentNode.dataset.id;
  }

  console.log(chosenCategoryId);
};