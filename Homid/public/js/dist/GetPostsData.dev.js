"use strict";

// get post data when for category
var getDisplayCategories = function getDisplayCategories() {
  fetch("/post/category/get").then(function (res) {
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