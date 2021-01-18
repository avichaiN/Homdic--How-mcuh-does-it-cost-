const express = require('express');
const user = require('../models/user');
const router = express.Router();
const User = require('../models/user');



function checkAdmin(req, res, next) {
    // make function to check if admin!!!

    next()
}

function getAllUsers() {
    return user.find().exec()
}
function deleteUserById(id) {
    return user.findOneAndDelete({ _id: id }).exec()
}
router.get("/", checkAdmin, async (req, res) => {
    let allUsers = await getAllUsers()
    res.send({ allUsers })
});

router.delete("/", checkAdmin, async (req, res) => {
    const { userId } = req.body
    let deleteUser = await deleteUserById(userId)
    let allUsers = await getAllUsers()

    res.send({ allUsers })
})


function updateUser(newEmail, newUsername, newfName, newlName, newRole, id) {
    return user.findByIdAndUpdate(id, { username: newUsername, email: newEmail, firstName: newfName, lastName: newlName , role: newRole }).exec()
}

router.put("/", checkAdmin, async (req, res) => {
    const { newEmail, newUsername, newfName, newlName, newRole, id } = req.body

    let update = await updateUser(newEmail, newUsername, newfName, newlName, newRole, id)
    console.log(update)
    let allUsers = await getAllUsers()

    res.send({ allUsers, update })
})


module.exports = router;