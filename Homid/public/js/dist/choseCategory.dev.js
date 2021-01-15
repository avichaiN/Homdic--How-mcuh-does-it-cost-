"use strict";

var showUserInfo = function showUserInfo() {
  document.querySelector('.cateogryPage__headerUserInfoShow').style.display = 'none';
  document.querySelector('.cateogryPage__headerUserInfoDrop').style.display = 'flex';
};

var hideUserInfo = function hideUserInfo() {
  document.querySelector('.cateogryPage__headerUserInfoShow').style.display = 'block';
  document.querySelector('.cateogryPage__headerUserInfoDrop').style.display = 'none';
};