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
  fetch('/search', {
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
    sessionStorage.setItem("postsId", data.postsId);
    window.location.replace('/search.html'); // window.location.replace(`/search/${data.postsId}`)
  });
};

var getSearchedPosts = function getSearchedPosts() {
  var postsId = sessionStorage.getItem("postsId");
  fetch("/search/".concat(postsId)).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.foundPosts === undefined || data.foundPosts === null) {
      console.log('NO POSTS FOUND');
    } else {
      console.log(data.foundPosts);
    }
  });
}; // hello user