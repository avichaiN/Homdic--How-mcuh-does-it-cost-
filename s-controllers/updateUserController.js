const jwt = require("jwt-simple");
const User = require("../s-models/user");
const bcrypt = require("bcrypt");
const saltRounds = 12;
require("dotenv").config();

exports.getUserInfo = async  (req, res)=> {
  try {
    const userCookie = req.cookies.userLoggedIn;
    const decoded = jwt.decode(userCookie, process.env.SECRET);
    const userFound = await User.findOne({ _id: decoded.id });
    res.send({ userFound });
  } catch (e) {
    console.log(e.message);
    res.send({ status: "unauthorized" });
  }
};
exports.editUser = async  (req, res)=> {
  try {
    const { firstName, lastName, username, email } = req.body;
    const userCookie = req.cookies.userLoggedIn;
    const decoded = jwt.decode(userCookie, process.env.SECRET);
    const updatedUser = await User.findOneAndUpdate(
      { _id: decoded.id },
      {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
      }
    );
    const userFound = await User.findOne({ username: username });
    const token = jwt.encode(
      {
        id: userFound._id,
        role: userFound.role,
        username: userFound.username,
        fName: userFound.firstName,
        lName: userFound.lastName,
        time: new Date().getTime(),
      },
      process.env.SECRET
    );
    res.cookie("userLoggedIn", token, {
      maxAge: 7200000,
      httpOnly: true,
    });
    res.send({ user: "updated" });
  } catch (e) {
    console.log(e.message);
    res.send({ status: "unauthorized" });
  }
};

exports.sendEmail = async  (req, res)=> {
  let newPassword = req.body.newPassword;
  bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
    try {
      newPassword = hash;
      const encodedId = req.headers.referer.replace(
        "http://homdic.herokuapp.com/updateUserPassword.html?",
        ""
      );

      const decodedId = jwt.decode(encodedId, process.env.SECRET);
      const userFound = await User.findOneAndUpdate(
        { _id: decodedId },
        {
          password: hash,
        }
      );

        const token = jwt.encode(
          {
            id: userFound._id,
            role: userFound.role,
            username: userFound.username,
            fName: userFound.firstName,
            lName: userFound.lastName,
            time: new Date().getTime(),
          },
        process.env.SECRET
      );
      res.cookie("userLoggedIn", token, {
        maxAge: 7200000,
        httpOnly: true,
      });
      res.send({ user: "updated" });
    } catch (e) {
      console.log(e);
      res.send({ user: "failed" });
      res.end();
    }
  });
};
exports.getUserName = async  (req, res)=> {
  try {
    const encodedId = req.body.encodedId;
    const decodedId = jwt.decode(encodedId, process.env.SECRET);
    const userFound = await User.findOne({ _id: decodedId });
    res.send({ user: userFound.firstName });
  } catch (e) {
    console.log(e.message);
    res.send({ status: "unauthorized" });
  }
};
