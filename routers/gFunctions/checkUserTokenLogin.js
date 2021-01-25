const express = require("express");
const jwt = require("jwt-simple");
const path = require('path')
require("dotenv").config();


const checkUserTokenLogin = (req, res, next) => {
    const token = req.cookies.userLoggedIn;
    const time = new Date().getTime()
    const oneday = 60 * 60 * 24 * 1000
    const oneDayAgo = time - oneday
    if (token) {
        const decoded = jwt.decode(token, process.env.SECRET);
        const tokenMadeTime = decoded.time
        if (tokenMadeTime > oneDayAgo) {
            next();
        }
    } else {
        res.redirect('/index')
    }
};


module.exports = [checkUserTokenLogin];
