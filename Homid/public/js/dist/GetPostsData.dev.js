"use strict";

var getPostsByIdInParams = function getPostsByIdInParams() {
  var url = window.location.href;
  var categoryId = url.split('/')[4];
  fetch("/posts/get/".concat(categoryId)).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data.foundPostsByCategoryId);
  });
};