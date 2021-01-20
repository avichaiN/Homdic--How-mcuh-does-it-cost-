"use strict";

var express = require("express");

var jwt = require("jwt-simple");

require("dotenv").config();

function checkAdmin(req, res, next) {
  var token = req.cookies.userLoggedIn;
  var time = new Date().getTime();
  var oneday = 60 * 60 * 24 * 1000;
  var oneDayAgo = time - oneday;

  if (token) {
    var decoded = jwt.decode(token, process.env.SECRET);
    var tokenMadeTime = decoded.time;

    if (tokenMadeTime < oneDayAgo) {
      // not a valid date ( made over 24 hours ago )
      res.send({
        admin: false
      });
    } else {
      if (decoded.role === "admin") {
        next();
      } else {
        res.send({
          admin: false
        });
      }
    }
  } else {
    res.send({
      admin: false
    });
  }
}

module.exports = checkAdmin;