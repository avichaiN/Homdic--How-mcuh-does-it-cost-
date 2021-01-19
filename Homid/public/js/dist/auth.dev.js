"use strict";

var checkUser = function checkUser() {
  fetch('/isLoggedIn').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (!data.user) {
      window.location.replace('index.html');
    }
  });
};