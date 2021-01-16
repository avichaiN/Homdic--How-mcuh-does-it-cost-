"use strict";

var showUserDropDown = function showUserDropDown(e) {
  document.querySelector('.cateogryPage__headerUserInfoDrop').style.display = 'flex';
  e.stopPropagation();
};

var hideUserDropDown = function hideUserDropDown() {
  document.querySelector('.cateogryPage__headerUserInfoDrop').style.display = 'none';
}; //search bar
// hello user