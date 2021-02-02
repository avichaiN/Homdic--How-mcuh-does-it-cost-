const express = require("express");
const jwt = require("jwt-simple");
require("dotenv").config();

function checkAdmin(req, res, next) {
  const token = req.cookies.userLoggedIn;
  const time = new Date().getTime()
  const oneday = 60 * 60 * 24 * 1000
  const oneDayAgo = time - oneday

  if (token) {
    var decoded = jwt.decode(token, process.env.SECRET);

    const tokenMadeTime = decoded.time

    if (tokenMadeTime < oneDayAgo) { // not a valid date ( made over 24 hours ago )
      res.send({ admin: false });

    } else {

      if (decoded.role === "admin") {
        next();
      } else {
        res.send({ admin: false });
      }
    }

  } else {
    res.send({ admin: false });
  }
}

module.exports = checkAdmin;
