
const User = require("../models/user");
require("dotenv").config();

exports.getAllUsers = async function (req, res) {
    try {
        const usersAmount = await getAllUsersLength()
        let allUsers = await getAllUsers();
        res.send({ allUsers, admin: true, usersAmount });
    } catch (err) {
        console.log(e.message);
        res.status(404).send({ status: "unauthorized" });
    }
};
exports.deleteUser = async function(req, res) {
    try {
        const { userId } = req.body;
        await deleteUserById(userId);
        let allUsers = await getAllUsers();
        res.send({ allUsers });
    } catch (err) {
        console.log(e.message);
        res.status(404).send({ status: "unauthorized" });
    }
};
exports.editUser = async function (req, res) {
    try {
        const { newEmail, newUsername, newfName, newlName, newRole, id } = req.body;

        let update = await updateUser(
            newEmail,
            newUsername,
            newfName,
            newlName,
            newRole,
            id
        );
        let allUsers = await getAllUsers();

        res.send({ allUsers, update });
    } catch (err) {
        console.log(e.message);
        res.status(404).send({ status: "unauthorized" });
    }
};
exports.checkAdminF = function(req, res) {
    try {
        res.send({ admin: true });
    } catch (err) {
        console.log(e.message);
        res.status(404).send({ status: "unauthorized" });
    }
};
async function getAllUsersLength() {
    let users = await User.find().exec();
    return users.length
}
function getAllUsers() {
    return User.find().exec();
}
function deleteUserById(id) {
    return User.findOneAndDelete({ _id: id }).exec();
}
function updateUser(newEmail, newUsername, newfName, newlName, newRole, id) {
    return User.findByIdAndUpdate(id, {
        username: newUsername,
        email: newEmail,
        firstName: newfName,
        lastName: newlName,
        role: newRole,
    }).exec();
}