"use strict";

fetch("/updateUserData").then(function (r) {
  return r.json();
}).then(function (data) {
  document.getElementById("firstName").setAttribute("value", "".concat(data.userFound.firstName));
  document.getElementById("lastName").setAttribute("value", "".concat(data.userFound.lastName));
  document.getElementById("username").setAttribute("value", "".concat(data.userFound.username));
  document.getElementById("email").setAttribute("value", "".concat(data.userFound.email));
});

function handleUpdateForm(e) {
  e.preventDefault();
  var firstName = e.target.children.firstName.value;
  var lastName = e.target.children.lastName.value;
  var username = e.target.children.username.value;
  var email = e.target.children.email.value;
  fetch("/updateUserData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.user == "updated") {
      window.location.replace("/category");
    } else {
      Swal.fire({
        icon: "error",
        title: "אופס...",
        text: "משהו השתבש בעדכון הפרטים, נא לנסות שוב..",
        confirmButtonColor: "red",
        confirmButtonText: "אישור"
      });
    }
  });
}