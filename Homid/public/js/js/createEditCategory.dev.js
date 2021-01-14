"use strict";

var handleNewCategory = function handleNewCategory(e) {
  e.preventDefault();
  var newCategory = document.getElementById('categoryInput').value;
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