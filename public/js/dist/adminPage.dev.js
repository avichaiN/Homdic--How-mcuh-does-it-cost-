"use strict";

var getAllUsers = function getAllUsers() {
  fetch("/admin").then(function (res) {
    return res.json();
  }).then(function (data) {
    if (!data.admin) {
      window.location.href = "index.html";
    } else {
      var usersAmount = data.usersAmount; // getPageAmount(usersAmount)

      writeUsersToDom(data.allUsers);
    }
  });
}; // function getlength(number) {
//   return number.toString().length;
// }
// const getPageAmount = (users) => {
//   const length = getlength(users)
//   console.log(length)
//   if (length == 1 || users == 10) {
//     console.log('only 1 page')
//   } else if (length == 2) {
//     const usersAmount = parseInt(('' + users)[0]) + 1
//     console.log(usersAmount)
//     renderPageAmount(usersAmount)
//   } else if (length == 3) {
//     // if user amount over 100 need to work here
//   }
// }
// const renderPageAmount = (num) => {
//   let html = ''
//   const pages = document.querySelector('#pages')
//   for (i = 0; i < num; i++) {
//     const skipAmount = parseInt(i + '0')
//     html += `<span class='page' onclick="getAllUsers(${skipAmount})">${i + 1}</span>`
//   }
//   pages.innerHTML = html
// }


var writeUsersToDom = function writeUsersToDom(users) {
  var usersBox = document.querySelector(".allUsers");
  var html = "";
  users.forEach(function (user) {
    html += "<div data-id='".concat(user._id, "' data-email='").concat(user.email, "' data-username='").concat(user.username, "' data-fn='").concat(user.firstName, "' data-ln='").concat(user.lastName, "', data-role='").concat(user.role, "' class=\"user\">\n    <a href='posts.html?admin=").concat(user._id, "'>\u05E6\u05E4\u05D4 \u05D1\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05E9\u05DC \u05DE\u05E9\u05EA\u05DE\u05E9 \u05D6\u05D4</a>\n        <label>\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9: ").concat(user.username, "</label>\n        <label>\u05D0\u05D9\u05D9\u05DE\u05DC: ").concat(user.email, "</label>\n        <label>\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9: ").concat(user.firstName, "</label>\n        <label>\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4: ").concat(user.lastName, "</label>\n        <label>\u05EA\u05E4\u05E7\u05D9\u05D3: ").concat(user.role, "</label>\n        <label>\u05EA\u05D0\u05E8\u05D9\u05DA \u05D9\u05E6\u05D9\u05E8\u05EA \u05DE\u05E9\u05EA\u05DE\u05E9: ").concat(user.createdAt, "</label>\n        <button onclick='handleOpenEditUser(event)'>\u05E2\u05E8\u05D5\u05DA</button>\n        <button onclick='handleDeleteUser(event)'>\u05DE\u05D7\u05E7</button>\n\n    </div>");
  });
  usersBox.innerHTML = html;
};

var handleDeleteUser = function handleDeleteUser(e) {
  var userId = e.target.parentNode.dataset.id;
  var username = e.target.parentNode.dataset.username;
  var areYouSure = confirm("Are you sure you want to delete User: ".concat(username));

  if (areYouSure == true) {
    fetch("/admin", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      writeUsersToDom(data.allUsers);
    });
  }
};

var handleOpenEditUser = function handleOpenEditUser(e) {
  var username = e.target.parentNode.dataset.username;
  var email = e.target.parentNode.dataset.email;
  var firstName = e.target.parentNode.dataset.fn;
  var lastName = e.target.parentNode.dataset.ln;
  var role = e.target.parentNode.dataset.role;
  var id = e.target.parentNode.dataset.id;
  document.querySelector(".editUserForm").style.display = "block";
  var html = document.querySelector(".editUserForm");
  html.innerHTML = "<form class=\"editUserFormm\" onsubmit=\"handleEditUser(event, '".concat(username, "','").concat(email, "','").concat(firstName, "','").concat(lastName, "','").concat(role, "','").concat(id, "')\">\n\n        <label>\u05DE\u05E9\u05EA\u05DE\u05E9 \u05E9\u05D0\u05EA\u05D4 \u05E2\u05D5\u05E8\u05DA:</label>\n        <input type=\"text\" name=\"username\" placeholder=\"\u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9: ").concat(username, "\">\n        <input type=\"email\" name=\"email\" placeholder=\"\u05D0\u05D9\u05D9\u05DE\u05DC: ").concat(email, "\">\n        <input type=\"text\" name=\"firstName\" placeholder=\"\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9: ").concat(firstName, "\">\n        <input type=\"text\" name=\"lastName\" placeholder=\"\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4: ").concat(lastName, "\">\n        <select id=\"role\" name=\"role\">\n        <option selected hidden>").concat(role, "</option>\n        <option value=\"public\">Public</option>\n        <option value=\"admin\">Admin</option>\n      </select>\n        <input type=\"submit\" value=\"\u05E2\u05E8\u05D5\u05DA \u05DE\u05E9\u05EA\u05DE\u05E9\">\n    </form>\n    <button onclick='hideEditForm()'>\u05D1\u05D8\u05DC</button>");
};

var hideEditForm = function hideEditForm() {
  document.querySelector(".editUserForm").style.display = "none";
};

var handleEditUser = function handleEditUser(e, username, email, firstName, lastName, role, id) {
  e.preventDefault();
  var newEmail = e.target.children.email.value;
  var newfName = e.target.children.firstName.value;
  var newlName = e.target.children.lastName.value;
  var newUsername = e.target.children.username.value;
  var newRole = e.target.children.role.selectedIndex;

  if (newRole === 0) {
    newRole = role;
  } else if (newRole === 1) {
    newRole = "public";
  } else if (newRole === 2) {
    newRole = "admin";
  }

  if (newUsername === "") {
    newUsername = username;
  } else if (newUsername.length < 3) {
    newUsername = username;
  }

  if (newEmail === "") {
    newEmail = email;
  }

  if (newfName === "") {
    newfName = firstName;
  }

  if (newlName === "") {
    newlName = lastName;
  }

  fetch("/admin", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      newEmail: newEmail,
      newUsername: newUsername,
      newfName: newfName,
      newlName: newlName,
      newRole: newRole,
      id: id
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    hideEditForm();
    writeUsersToDom(data.allUsers);
  });
};