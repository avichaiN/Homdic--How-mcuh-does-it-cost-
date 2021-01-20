const express = require("express");
const jwt = require("jwt-simple");

// לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env
const secret = "temporary";

// Add this to top of route which using this function
// const checkUserToken = require('../routers/checkUserToken');
// will send back user:false if no good
// then you can simply do this:
// if (data.status === 'unauthorized') {
//     window.location.replace('index.html')
// } else {

// }

//middleware check for user token

const checkUserToken = (req, res, next) => {
  const token = req.cookies.userLoggedIn;

  if (token) {
    const decoded = jwt.decode(token, secret);
    req.userInfo = decoded;

    next();
  } else {
    status = 'unauthorized'
    res.send({status})
  }
};

module.exports = checkUserToken;
