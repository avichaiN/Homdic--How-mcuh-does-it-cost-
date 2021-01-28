"use strict";

fetch("/updateUserData").then(function (r) {
  return r.json();
}).then(function (data) {
  try {
    document.getElementById("firstName").setAttribute("value", "".concat(data.userFound.firstName));
    document.getElementById("lastName").setAttribute("value", "".concat(data.userFound.lastName));
    document.getElementById("username").setAttribute("value", "".concat(data.userFound.username));
    document.getElementById("email").setAttribute("value", "".concat(data.userFound.email));
  } catch (e) {
    console.log(e);
  }
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
            _context.prev = 0;

            if (!(data.user == "updated")) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return regeneratorRuntime.awrap(Swal.fire({
              position: "top-center",
              icon: "success",
              title: "פרטייך עודכנו במערכת",
              showConfirmButton: false,
              timer: 1500
            }));

          case 4:
            window.location.href = "/category";
            _context.next = 8;
            break;

          case 7:
            Swal.fire({
              icon: "error",
              title: "אופס...",
              text: "משהו השתבש בעדכון הפרטים, נא לנסות שוב..",
              confirmButtonColor: "red",
              confirmButtonText: "אישור"
            });

          case 8:
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
}