"use strict";

function getUserName() {
  var encodedId = window.location.href.replace("http://localhost:3000/updateUserPassword.html?", "");
  fetch("/resetpassword/getusername", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      encodedId: encodedId
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.user) {
      var title = document.getElementById("firstName").innerHTML = "<h2>\u05E9\u05DC\u05D5\u05DD \u05DC\u05DA  ".concat(data.user, "</h2>");
    } else {
      console.log("can't get first name");
    }
  });
}

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
  }).then(function _callee(data) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(data.user == "updated")) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return regeneratorRuntime.awrap(Swal.fire({
              position: "top-center",
              icon: "success",
              title: "פרטייך עודכנו במערכת, הנך מועבר/ת לאתר..",
              showConfirmButton: false,
              timer: 1000
            }));

          case 3:
            window.location.replace("/category");
            _context.next = 7;
            break;

          case 6:
            Swal.fire({
              icon: "error",
              title: "אופס...",
              text: "משהו השתבש בעדכון הפרטים, נא לנסות שוב..",
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