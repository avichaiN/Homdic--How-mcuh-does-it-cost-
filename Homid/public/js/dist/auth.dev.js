"use strict";

// const checkUser = () => {
//     fetch('/isLoggedIn')
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             if (!data.user) {
//                 window.location.replace('index.html')
//             } else {
//                 const name = data.userInfo.name
//                 sayHelloToUser(name)
//             }
//         })
// }
var handleLogout = function handleLogout() {
  fetch('/logout').then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.loggedout) {
      window.location.replace('/index.html');
    }
  });
};