"use strict";

var express = require("express");

var jwt = require("jwt-simple");

require("dotenv").config(); // Add this to top of route which using this function
// const checkUserToken = require('../routers/checkUserToken');
// will send back user:false if no good
// then you can simply do this:
// if (data.status === 'unauthorized') {
//     window.location.replace('index.html')
// } else {
// }
//middleware check for user token


var checkUserToken = function checkUserToken(req, res, next) {
  var token = req.cookies.userLoggedIn;
  var time = new Date().getTime();
  var oneday = 60 * 60 * 24 * 1000;
  var oneDayAgo = time - oneday;

  if (token) {
    var decoded = jwt.decode(token, process.env.SECRET);
    var tokenMadeTime = decoded.time;

    if (tokenMadeTime > oneDayAgo) {
      next();
    } else {
      status = "unauthorized";
      res.send({
        status: status
      });
    }
  } else {
    status = "unauthorized";
    res.send({
      status: status
    });
  }
};

module.exports = checkUserToken;