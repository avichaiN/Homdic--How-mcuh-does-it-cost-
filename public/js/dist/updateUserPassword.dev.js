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
    try {
      if (data.user) {
        var title = document.getElementById("firstName").innerHTML = "<h2>\u05E9\u05DC\u05D5\u05DD \u05DC\u05DA  ".concat(data.user, "</h2>");
      } else {
        console.log("can't get first name");
      }
    } catch (e) {
      console.log(e);
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
            _context.prev = 0;

            if (!(data.user == "updated")) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return regeneratorRuntime.awrap(Swal.fire({
              position: "top-center",
              icon: "success",
              title: "פרטייך עודכנו במערכת, הנך מועבר/ת לאתר..",
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