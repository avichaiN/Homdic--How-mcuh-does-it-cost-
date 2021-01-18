"use strict";

function showAddpost() {
  document.querySelector(".AddPost").classList.replace("hide", "show");
  document.querySelector("#addPostbutton").classList.replace("show", "hide");
  document.querySelector("#removePostbutton").classList.replace("hide", "show");
}

function hideAddpost() {
  console.log("hide");
  document.querySelector(".AddPost").classList.replace("show", "hide");
  document.querySelector("#addPostbutton").classList.replace("hide", "show");
  document.querySelector("#removePostbutton").classList.replace("show", "hide");
}

function HideAddComment() {
  document.querySelector("#AddCommentButton").classList.replace("hide", "show");
  document.querySelector("#cancelButton").classList.replace("show", "hide");
  document.querySelector("#addComment").classList.replace("show", "hide");
}

function ShowAddComment() {
  document.querySelector("#AddCommentButton").classList.replace("show", "hide");
  document.querySelector("#cancelButton").classList.replace("hide", "show");
  document.querySelector("#addComment").classList.replace("hide", "show");
}