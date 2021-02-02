const express = require("express");
const router = express.Router();
const checkUserToken = require("../routers/gFunctions/checkUserToken");
const updateUserController = require("../controllers/updateUserController")


router
  .route("/")
  .get(checkUserToken, updateUserController.getUserInfo)
  .post(checkUserToken, updateUserController.editUser)

  router
  .route("/resetpassword")
  .put(updateUserController.sendEmail)
  .post(updateUserController.getUserName)

module.exports = router;
