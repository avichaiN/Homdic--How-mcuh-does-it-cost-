"use strict";

var showUserInfo = function showUserInfo(ev) {
  document.querySelector('.cateogryPage__headerUserInfoShow').style.display = 'none';
  document.querySelector('.cateogryPage__headerUserInfoDrop').style.opacity = '1';
  document.querySelector('.cateogryPage__headerUserInfoDrop').style.height = '89px';
  ev.stopPropagation();
};

var hideUserInfo = function hideUserInfo() {
  document.querySelector('.cateogryPage__headerUserInfoShow').style.display = 'block';
  document.querySelector('.cateogryPage__headerUserInfoDrop').style.opacity = '0';
  document.querySelector('.cateogryPage__headerUserInfoDrop').style.height = '0';
};