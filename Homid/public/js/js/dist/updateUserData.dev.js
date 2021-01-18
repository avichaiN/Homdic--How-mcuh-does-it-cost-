"use strict";

fetch("/get-user-data").then(function (r) {
  return r.json();
}).then(function (data) {
  console.log(data);
});