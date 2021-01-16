"use strict";

//if admin display this.
var handleDisplayAddCategory = function handleDisplayAddCategory() {
  document.querySelector(".category__adminAddCategoryForm").style.display = "block";
}; // handle new category ( admin )


var handleNewCategory = function handleNewCategory(e) {
  e.preventDefault();
  var newCategoryName = document.getElementById('categoryInput').value;
  var newCategoryImg = document.getElementById('categoryInput').value;
  fetch('/category/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      newCategoryName: newCategoryName,
      newCategoryImg: newCategoryImg
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
  });
}; // button to show menu of edit or delete for amdin.


var showEditOrDeleteCategory = function showEditOrDeleteCategory(e) {
  document.querySelector('.deleteCategory').style.display = 'inline';
  document.querySelector('.editCategory').style.display = 'inline';
  e.stopPropagation();
}; // button to hide menu of edit or delete for amdin.


var hideEditOrDeleteCategory = function hideEditOrDeleteCategory() {
  document.querySelector('.deleteCategory').style.display = 'none';
  document.querySelector('.editCategory').style.display = 'none';
}; //delete category


var deleteCategory = function deleteCategory(e) {
  e.stopPropagation();
  console.log(e.target.parentNode.dataset.id);
}; //edit category


var editCategory = function editCategory(e) {
  e.stopPropagation();
  console.log(e.target.parentNode.dataset.id); // add menu of edit category
};