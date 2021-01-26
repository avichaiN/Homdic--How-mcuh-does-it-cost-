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
              title: "פרטייך עודכנו במערכת",
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