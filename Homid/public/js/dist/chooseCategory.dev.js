"use strict";

// get all categories when loading page
var getCategories = function getCategories() {
  fetch('/category').then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
  });
}; // go to clicked category


var goToClickedCategory = function goToClickedCategory(e) {
  var chosenCategoryId = e.target.dataset.id;

  if (chosenCategoryId === undefined) {
    chosenCategoryId = e.target.parentNode.dataset.id;
  }

  console.log(chosenCategoryId);
};