const express = require("express");
const router = express.Router();

const cookieParser = require("cookie-parser");
const checkUserToken = require("../routers/gFunctions/checkUserToken");
const authController = require("../controllers/authController")

router.use(cookieParser());

router
  .route("/")
  .post(authController.loginUser)
  .delete(authController.logUserOut)

  router
  .route("/register")
  .post(authController.registerUser)

router
  .route("/userInfo")
  .get(authController.getUserInfo)

router
  .route("/reset")
  .post(authController.resetPassword)

router
  .route("/checkCookie")
  .get(checkUserToken, authController.checkUserCookie)


module.exports = router
