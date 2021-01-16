"use strict";

var showUserDropDown = function showUserDropDown(e) {
  document.querySelector('.header__userInfoDrop').style.display = 'flex';
  e.stopPropagation();
};

var hideUserDropDown = function hideUserDropDown() {
  document.querySelector('.header__userInfoDrop').style.display = 'none';
}; //search bar
// hello user