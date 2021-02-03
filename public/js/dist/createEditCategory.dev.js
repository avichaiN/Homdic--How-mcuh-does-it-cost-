"use strict";

var handleDisplayAddCategory = function handleDisplayAddCategory() {
  document.querySelector(".category__adminAddCategoryForm").style.display = "block";
}; // handle new category ( admin )


var handleNewCategory = function handleNewCategory(e) {
  e.preventDefault();
  var newCategoryName = document.getElementById("categoryInput").value;
  var img = document.getElementById("categoryImgInput");
  var imgFile = img.files[0];
  var formData = new FormData();
  formData.append("newCategoryName", newCategoryName);
  formData.append("img", imgFile, imgFile.name);
  fetch("/category", {
    method: "POST",
    headers: {},
    body: formData
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (!data.ok) {
      console.log("error adding category");
    } else {
      writeCategoiresToDom(data.categories);
    }
  });
}; // button to show menu of edit or delete for amdin.


var showEditOrDeleteCategory = function showEditOrDeleteCategory(e) {
  var deleteButton = document.querySelectorAll(".deleteCategory"),
      i;
  var editButton = document.querySelectorAll(".editCategory");

  for (i = 0; i < deleteButton.length; ++i) {
    deleteButton[i].style.display = "inline";
    editButton[i].style.display = "inline";
  }

  e.stopPropagation();
}; // button to hide menu of edit or delete for amdin.


var hideEditOrDeleteCategory = function hideEditOrDeleteCategory() {
  var deleteButton = document.querySelectorAll(".deleteCategory"),
      i;
  var editButton = document.querySelectorAll(".editCategory");

  for (i = 0; i < deleteButton.length; ++i) {
    deleteButton[i].style.display = "none";
    editButton[i].style.display = "none";
  }
}; //delete category


var deleteCategory = function deleteCategory(e) {
  e.stopPropagation();
  var chosenCategoryid = e.target.parentNode.dataset.id;
  console.log("delete category");
  fetch("/category", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chosenCategoryid: chosenCategoryid
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    writeCategoiresToDom(data.categories);
  });
}; //edit category


var editCategoryForm = function editCategoryForm(e) {
  e.stopPropagation();
  var categoryName = e.target.parentNode.dataset.name;
  var categoryImg = e.target.parentNode.dataset.img;
  var categoryId = e.target.parentNode.dataset.id;
  document.querySelector(".category__edit").style.display = "block";
  var editCategoryFormHtml = "\n  <label>\u05E9\u05DD \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4: ".concat(categoryName, "</label><br>\n  <img src=\"data:image/jpg;base64,").concat(categoryImg, "\">\n  <form onsubmit=\"editCategory(event)\">\n  <input type=\"text\" data-name='").concat(categoryName, "' data-id='").concat(categoryId, "' name='name' placeholder=\"\u05E9\u05DD \u05D7\u05D3\u05E9\"><br>\n      <input style=\"margin-top:10px;margin-right:120px;margin-bottom:10px;\" type=\"file\" data-img='").concat(categoryImg, "' name='img' placeholder=\"\u05EA\u05DE\u05D5\u05E0\u05D4 \u05D7\u05D3\u05E9\u05D4\"><br>\n      <button type=\"submit\">\u05E2\u05D3\u05DB\u05DF</button>\n      <button onclick='hideAddCategoryAndEditForm()'>\u05D1\u05D8\u05DC</button>\n  </form>\n  <label>\u05DB\u05DC \u05E9\u05D3\u05D4 \u05E9\u05D9\u05E9\u05D0\u05E8 \u05E8\u05D9\u05E7 \u05D9\u05E9\u05DE\u05D5\u05E8 \u05D0\u05EA \u05D4\u05E2\u05E8\u05DA \u05D4\u05D9\u05E9\u05DF</label>");
  document.querySelector(".category__edit").innerHTML = editCategoryFormHtml;
};

var hideAddCategoryAndEditForm = function hideAddCategoryAndEditForm() {
  document.querySelector(".category__edit").style.display = "none";
  document.querySelector(".category__adminAddCategoryForm").style.display = "none";
};

var editCategory = function editCategory(e) {
  e.preventDefault();
  var categoryId = e.target.children.name.dataset.id;
  var oldCategoryName = e.target.children.name.dataset.name;
  var oldCategoryImg = e.target.children.img.dataset.img;
  var newCategoryName = e.target.children.name.value;
  var newCategoryImg = e.target.children.img;

  if (newCategoryName === "") {
    newCategoryName = oldCategoryName;
  }
  /*  if (newCategoryImg === "") {
    newCategoryImg = oldCategoryImg;
  }
  */

  /* JSON.stringify({ categoryId, newCategoryImg, newCategoryName }) */


  var formData = new FormData();
  formData.append("categoryId", categoryId);
  formData.append("newCategoryName", newCategoryName);

  if (newCategoryImg.files[0]) {
    formData.append("img", newCategoryImg.files[0], newCategoryImg.files[0].name);
  }

  fetch("/category", {
    method: "put",
    headers: {},
    body: formData
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    writeCategoiresToDom(data.categories);
  });
};