"use strict";

var renderNavToDom = function renderNavToDom() {
  var html = "";
  html = "<div class=\"header__helloUser\"></div>\n      <form class=\"header__form\" onsubmit=\"handleSearch(event)\">\n          <input class=\"header__formInput\" placeholder='\u05D7\u05E4\u05E9 \u05E4\u05D5\u05E1\u05D8\u05D9\u05DD' type=\"text\" required>\n          <!-- <input class=\"header__formSubmit\" type=\"submit\" value=\"\u05D7\u05E4\u05E9\"> -->\n          <button class=\"header__formSubmit\" type=\"submit\"><i class=\"fa fa-search\"></i></button>\n      </form>\n      <a href=\"/adminPage.html\" class=\"header__adminPage\">\u05D0\u05D3\u05DE\u05D9\u05DF</a>\n  \n      <!-- user info / logout / edit user // show all posts -->\n  \n      <div class=\"header__userInfo\">\n          <img onclick=\"showUserDropDown(event)\"\n              src=\"/styles/img/menu.png\">\n          <div class=\"header__userInfoDrop\">\n              <a href=\"/Categories.html\">\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D5\u05EA</a>\n              <a href=\"/posts.html?myposts\">\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05E9\u05DC\u05D9</a>\n              <a href=\"/posts.html?myfavorites\">\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</a>\n              <a href=\"/updateUserData.html\">\u05E2\u05D3\u05DB\u05DF \u05E4\u05E8\u05D8\u05D9 \u05D7\u05E9\u05D1\u05D5\u05DF</a>\n              <button onclick=\"handleLogout()\">\u05D4\u05EA\u05E0\u05EA\u05E7</button>\n          </div>\n      </div>";
  var header = document.querySelector(".header");
  header.innerHTML = html;
  getUserInfo(), displayGoToAdminPage();
};

var getUserInfo = function getUserInfo() {
  var user;
  return regeneratorRuntime.async(function getUserInfo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("/userInfo").then(function (res) {
            return res.json();
          }).then(function (data) {
            if (!data.decoded) {
              window.location.href = '/index.html';
            }

            var name = data.decoded.fName;
            sayHelloToUser(name);
            user = data.decoded;
          }));

        case 2:
          return _context.abrupt("return", user);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

var sayHelloToUser = function sayHelloToUser(name) {
  var myDate = new Date();
  var hrs = myDate.getHours();
  var greet;
  var sayHello = document.querySelector(".header__helloUser");
  if (hrs < 12 && hrs > 4) greet = "בוקר טוב";else if (hrs >= 12 && hrs <= 16) greet = "צהרים טובים";else if (hrs >= 16 && hrs <= 24) greet = "ערב טוב";else if (hrs <= 4) greet = "לילה טוב";
  sayHello.innerHTML = "".concat(greet, ", ").concat(name);
};

var displayGoToAdminPage = function displayGoToAdminPage() {
  var checkAdmin;
  return regeneratorRuntime.async(function displayGoToAdminPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(handleCheckAdmin());

        case 2:
          checkAdmin = _context2.sent;

          if (checkAdmin) {
            document.querySelector(".header__adminPage").style.display = "block";
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var showUserDropDown = function showUserDropDown(e) {
  document.querySelector(".header__userInfoDrop").style.display = "flex";
  e.stopPropagation();
};

var hideUserDropDown = function hideUserDropDown() {
  document.querySelector(".header__userInfoDrop").style.display = "none";
}; //search bar


var handleSearch = function handleSearch(e) {
  e.preventDefault();
  var searched = document.querySelector(".header__formInput").value;

  if (searched.length > 2) {
    var searchedSep = searched.replace(/\s/g, "-");
    window.location.href = "/posts.html?search?".concat(searchedSep);
  } else {
    document.querySelector(".header__formInput").value = "";
    document.querySelector(".header__formInput").placeholder = "חיפוש חייב להיות מעל 2 תווים";
  }
}; // hello user