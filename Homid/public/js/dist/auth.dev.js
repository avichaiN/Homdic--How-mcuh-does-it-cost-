"use strict";

var checkUser = function checkUser() {
  fetch('/isLoggedIn').then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);

    if (!data.user) {
      window.location.replace('index.html');
    } else {
      var name = data.userInfo.name;
      sayHelloToUser(name);
    }
  });
};

var handleLogout = function handleLogout() {
  fetch('/logout').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.loggedout) {
      window.location.replace('/index.html');
    }
  });
};