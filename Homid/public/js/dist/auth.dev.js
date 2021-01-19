"use strict";

var getUserInfo = function getUserInfo() {
  fetch('/userInfo').then(function (res) {
    return res.json();
  }).then(function (data) {
    var name = data.name;
    sayHelloToUser(name);
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