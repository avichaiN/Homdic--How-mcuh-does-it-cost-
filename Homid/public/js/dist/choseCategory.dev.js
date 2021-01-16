"use strict";

var getCategories = function getCategories() {
  fetch('/category/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      newCategory: newCategory
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
  });
};