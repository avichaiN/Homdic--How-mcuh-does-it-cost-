const express = require("express");
const router = express.Router();
const adminController = require("../s-controllers/adminController");

const User = require("../s-models/user");
const cookieParser = require("cookie-parser");
const checkAdmin = require("../s-routers/gFunctions/checkAdmin");
require("dotenv").config();

router.use(cookieParser());


router
  .route("/")
  .get(checkAdmin, adminController.getAllUsers)
  .delete(checkAdmin, adminController.deleteUser)
  .put(checkAdmin, adminController.editUser)

  router
  .route("/check")
  .get(checkAdmin, adminController.checkAdminF)



module.exports = router;
