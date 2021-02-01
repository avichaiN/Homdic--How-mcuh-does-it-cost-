"use strict";

var startLoad = function startLoad() {
  getDisplayCategories();
  displayAdminCategory();
}; // get all categories when loading page


var getDisplayCategories = function getDisplayCategories() {
  fetch("/category/get").then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.status === "unauthorized") {
      window.location.href = "index.html";
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
    categoriesHtml += "<div onclick=\"goToClickedCategory(event)\" class=\"cateogryPage__categorysBox\" data-name='".concat(category.Name, "' data-id='").concat(category._id, "'>\n        <img src=\"data:image/jpg;base64,").concat(category.img, "\" />\n        <div class=\"cateogryPage__categorysBoxContainer\" data-img='").concat(category.img, "' data-name='").concat(category.Name, "' data-id='").concat(category._id, "'>\n            <p>").concat(category.Name, "</p>\n            <button onclick='deleteCategory(event)' style=\"display: none;\" class=\"deleteCategory\">\u05DE\u05D7\u05E7</button>\n            <!-- add menu of edit cateogry -->\n            <button onclick='editCategoryForm(event)' style=\"display: none;\" class=\"editCategory\">\u05E2\u05E8\u05D5\u05DA</button>\n        </div>\n    </div>");
  });
  categoryDiv.innerHTML = categoriesHtml;
}; // go to clicked category


var goToClickedCategory = function goToClickedCategory(e) {
  var chosenCategoryId = e.target.dataset.id;

  if (chosenCategoryId === undefined) {
    chosenCategoryId = e.target.parentNode.dataset.id;
  }

  window.location.href = "/posts.html?".concat(chosenCategoryId);
};