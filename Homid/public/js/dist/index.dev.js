"use strict";

var tab1 = document.getElementById("tab1");
var tab2 = document.getElementById("tab2");
var formSignIn = document.getElementById("form1");
var formSigneUp = document.getElementById("form2");
var formReset = document.getElementById("form3");

function showPageSignUp(e) {
  tab1.classList.remove("active");
  tab2.classList.add("active");
  formSignIn.style.display = "none";
  formSigneUp.style.display = "block";
  formReset.style.display = "none";
}

function showPageSignIn(e) {
  tab1.classList.add("active");
  tab2.classList.remove("active");
  formSignIn.style.display = "block";
  formSigneUp.style.display = "none";
  formReset.style.display = "none";
}

function showPageReset(e) {
  formSignIn.style.display = "none";
  formReset.style.display = "block";
}

function handleLoginForm(e) {
  e.preventDefault();
  var username = e.target.children.username.value;
  var password = e.target.children.password.value;
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.status == "unauthorized") {
      Swal.fire({
        icon: "error",
        title: "אופס...",
        text: "משתמש/אימייל או הסיסמא אינם נכונים, נסה שוב",
        confirmButtonColor: "red",
        confirmButtonText: "אישור"
      });
    } else {
      window.location.href = "/";
    }
  });
}

function handleRegisterForm(e) {
  e.preventDefault();
  var firstName = e.target.children.firstName.value;
  var lastName = e.target.children.lastName.value;
  var username = e.target.children.username.value;
  var email = e.target.children.email.value;
  var password = e.target.children.password.value;
  fetch("/register", {
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