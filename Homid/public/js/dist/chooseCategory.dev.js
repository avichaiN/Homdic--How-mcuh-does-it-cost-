"use strict";

var getCategories = function getCategories() {
  fetch('/category').then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
  });
};