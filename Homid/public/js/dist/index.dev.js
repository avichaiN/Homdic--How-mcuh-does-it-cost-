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
      window.location.href = "/categories.html";
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

function handleResetPassword(e) {
  e.preventDefault();
  var userEmail = e.target.children.userEmail.value;
  fetch("/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userEmail: userEmail
    })
  }).then(function (res) {
    return res.json();
  }).then(function _callee(data) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(data.email == "success")) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return regeneratorRuntime.awrap(Swal.fire({
              position: "top-center",
              icon: "success",
              title: "אימייל עם קישור לשחזור הסיסמה נשלח אלייך.",
              showConfirmButton: false,
              timer: 1500
            }));

          case 3:
            window.location.replace("/");
            _context.next = 7;
            break;

          case 6:
            Swal.fire({
              icon: "error",
              title: "אופס...",
              text: "כנראה שקרתה שגיאה, לא הצלחנו לאתר את המייל שלך, נסה שוב..",
              confirmButtonColor: "red",
              confirmButtonText: "אישור"
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  });
}