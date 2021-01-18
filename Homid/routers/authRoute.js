const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get("/", (req, res) => {
    res.sendFile("index.html");
});

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userFound = await User.findOne({
            $or: [{ username: username }, { email: username }],
        });
        if (userFound.password == password) {
            res.send({ status: "authorized" });
        }
    } catch (e) {
        console.log(e);
        res.send({ status: "unauthorized" });
        res.end();
    }
});

router.get("/register", (req, res) => {
    res.sendFile("public/register.html", { root: __dirname });
});

router.post("/register", async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    const newUser = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
    });
    try {
        await newUser.save();
        res.send({ status: "authorized" });
    } catch (e) {
        console.log(e);
        res.send({ status: "unauthorized" });
        res.end();
    }
});
module.exports = router;