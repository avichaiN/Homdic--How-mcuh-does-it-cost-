"use strict";

var sayHelloToUser = function sayHelloToUser(name) {
  var myDate = new Date();
  var hrs = myDate.getHours();
  var greet;
  var sayHello = document.querySelector('.header__helloUser');
  if (hrs < 12) greet = 'בוקר טוב';else if (hrs >= 12 && hrs <= 17) greet = 'צהרים טובים';else if (hrs >= 17 && hrs <= 24) greet = 'ערב טוב';
  sayHello.innerHTML = "".concat(greet, ", ").concat(name);
};

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

  if (searched.length > 2) {
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
      sessionStorage.setItem("keywords", data.searchClean);
      window.location.replace("/search.html");
    });
  } else {
    document.querySelector('.header__formInput').value = "";
    document.querySelector('.header__formInput').placeholder = "חיפוש חייב להיות מעל 2 תווים";
  }
};

var getSearchedPosts = function getSearchedPosts() {
  var keywords = sessionStorage.getItem("keywords");
  document.querySelector('.header__formInput').value = keywords;

  if (keywords === '') {
    console.log('no posts found');
  } else {
    fetch("/search/".concat(keywords)).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (!data.ok) {
        console.log('no posts found');
      } else {
        console.log(data.posts);
      }
    });
  }
}; // hello user