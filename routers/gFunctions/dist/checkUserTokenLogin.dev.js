"use strict";

var jwt = require("jwt-simple");

require("dotenv").config();

var checkUserTokenLogin = function checkUserTokenLogin(req, res, next) {
  var token = req.cookies.userLoggedIn;
  var time = new Date().getTime();
  var oneday = 60 * 60 * 24 * 1000;
  var oneDayAgo = time - oneday;

  if (token) {
    var decoded = jwt.decode(token, process.env.SECRET);
    var tokenMadeTime = decoded.time;

    if (tokenMadeTime > oneDayAgo) {
      next();
    }
  } else {
    res.redirect('/index');
  }
};

module.exports = [checkUserTokenLogin];