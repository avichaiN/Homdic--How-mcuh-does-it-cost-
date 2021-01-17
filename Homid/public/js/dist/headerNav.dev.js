"use strict";

var showUserDropDown = function showUserDropDown(e) {
  document.querySelector('.header__userInfoDrop').style.display = 'flex';
  e.stopPropagation();
};

var hideUserDropDown = function hideUserDropDown() {
  document.querySelector('.header__userInfoDrop').style.display = 'none';
}; //search bar


var handleSearch = function handleSearch(e) {
  e.preventDefault();
  var searched = document.querySelector('.header__formInput').value;
  fetch('/category/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      searched: searched
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data.searchRes);
  });
};

var test = function test() {
  fetch('/category/createrandompost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
  });
}; // hello user