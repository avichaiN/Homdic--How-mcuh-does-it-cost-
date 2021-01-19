"use strict";

fetch("/updateUserData").then(function (r) {
  return r.json();
}).then(function (data) {
  console.log(data);
  document.getElementById("firstName").setAttribute("value", "".concat(data.userFound.firstName));
  document.getElementById("lastName").setAttribute("value", "".concat(data.userFound.lastName));
  document.getElementById("username").setAttribute("value", "".concat(data.userFound.username));
  document.getElementById("email").setAttribute("value", "".concat(data.userFound.email));
});

function handleUpdateForm(e) {
  e.preventDefault();
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.status == "unauthorized") {
      Swal.fire({
        icon: "error",
        title: "אופס...",
        text: "כנראה שהפרטים שהזנת לא נכונים או קיימים במערכת, נסה שנית",
        confirmButtonColor: "red",
        confirmButtonText: "אישור"
      });
    } else {
      window.location.href = "/";
    }
  });
}