"use strict";

var handleCheckAdmin = function handleCheckAdmin() {
  var admin;
  return regeneratorRuntime.async(function handleCheckAdmin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          admin = false;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('/admin/check').then(function (res) {
            return res.json();
          }).then(function (data) {
            if (data.admin) {
              admin = true;
            } else {
              admin = false;
            }
          }));

        case 3:
          return _context.abrupt("return", admin);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

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