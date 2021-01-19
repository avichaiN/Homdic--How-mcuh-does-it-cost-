const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jwt-simple");
const cookieParser = require("cookie-parser");
// לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env
const secret = "temporary";
router.use(cookieParser());

function checkAdmin(req, res, next) {
  const token = req.cookies.userLoggedIn;

  if (token) {
    var decoded = jwt.decode(token, secret);
    console.log(decoded.role);
    if (decoded.role === "admin") {
      next();
    } else {
      res.send({ admin: false });
    }
  } else {
    res.redirect("/");
  }
}

function getAllUsers() {
  return User.find().exec();
}
function deleteUserById(id) {
  return User.findOneAndDelete({ _id: id }).exec();
}

router.get("/", checkAdmin, async (req, res) => {
  let allUsers = await getAllUsers();
  res.send({ allUsers, admin: true });
});

router.get("/check", checkAdmin, async (req, res) => {
  res.send({ admin: true });
});

router.delete("/", checkAdmin, async (req, res) => {
  const { userId } = req.body;
  let deleteUser = await deleteUserById(userId);
  let allUsers = await getAllUsers();

  res.send({ allUsers });
});

function updateUser(newEmail, newUsername, newfName, newlName, newRole, id) {
  return User.findByIdAndUpdate(id, {
    username: newUsername,
    email: newEmail,
    firstName: newfName,
    lastName: newlName,
    role: newRole,
  }).exec();
}

router.put("/", checkAdmin, async (req, res) => {
  const { newEmail, newUsername, newfName, newlName, newRole, id } = req.body;

  let update = await updateUser(
    newEmail,
    newUsername,
    newfName,
    newlName,
    newRole,
    id
  );
  console.log(update);
  let allUsers = await getAllUsers();

  res.send({ allUsers, update });
});

module.exports = router;
module.exports = checkAdmin;
