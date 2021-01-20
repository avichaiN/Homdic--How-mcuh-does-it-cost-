"use strict";

var express = require("express");

var jwt = require("jwt-simple");

require("dotenv").config();

function checkAdmin(req, res, next) {
  var token = req.cookies.userLoggedIn;

  if (token) {
    var decoded = jwt.decode(token, process.env.SECRET);

    if (decoded.role === "admin") {
      next();
    } else {
      res.send({
        admin: false
      });
    }
  } else {
    res.send({
      admin: false
    });
  }
}

module.exports = checkAdmin;