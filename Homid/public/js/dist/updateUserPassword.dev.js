"use strict";

fetch("/:id").then(function (r) {
  return r.json();
}).then(function (data) {
  var firtName = document.getElementById("firstName").innerHTML = "<h2>\u05D1\u05E8\u05D5\u05DA \u05D4\u05D1\u05D0, ".concat(data.user, "</h2>");
});

function handleUpdatePassword(e) {
  e.preventDefault();
  var newPassword = e.target.children.password.value;
  fetch("/resetpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      newPassword: newPassword
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
  });
}