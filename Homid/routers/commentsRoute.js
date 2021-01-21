const express = require("express");
const router = express.Router();
const comments = require("../models/comments");
const checkUserToken = require("./gFunctions/checkUserToken");
const path = require('path')

router.get('/:id', checkUserToken, async (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "posts.html"));
})
