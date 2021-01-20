"use strict";

function showAddpost() {
  document.querySelector('.AddPost').classList.replace('hide', 'show');
  document.querySelector('#addPostbutton').classList.replace('show', 'hide');
  document.querySelector('#removePostbutton').classList.replace('hide', 'show');
}

function hideAddpost() {
  console.log('hide');
  document.querySelector('.AddPost').classList.replace('show', 'hide');
  document.querySelector('#addPostbutton').classList.replace('hide', 'show');
  document.querySelector('#removePostbutton').classList.replace('show', 'hide');
}

function HideAddComment() {
  document.querySelector('#AddCommentButton').classList.replace('hide', 'show');
  document.querySelector('#cancelButton').classList.replace('show', 'hide');
  document.querySelector('#addComment').classList.replace('show', 'hide');
}

function ShowAddComment() {
  document.querySelector('#addComment').innerHTML = "<div>\n    <p>\u05D4\u05D5\u05E1\u05E3 \u05EA\u05D2\u05D5\u05D1\u05D4</p>\n    <form action=\"\">\n      <textarea name=\"message\"></textarea>\n      <input type=\"button\" value=\"\u05E9\u05DC\u05D7\">\n    </form>\n  </div>";
  document.querySelector('#AddCommentButton').classList.replace('show', 'hide');
  document.querySelector('#cancelButton').classList.replace('hide', 'show');
  document.querySelector('#addComment').classList.replace('hide', 'show');
}

function PostNotificationsButtonClicked() {
  document.querySelector('#NotificationsButton').classList.toggle('Toggled');
}

function PostFavoriteButtonClicked() {
  document.querySelector('#FavoriteButton').classList.toggle('Toggled');
}