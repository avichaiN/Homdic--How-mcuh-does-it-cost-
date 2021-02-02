const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const User = require("../models/user");
const cookieParser = require("cookie-parser");
const checkAdmin = require("../routers/gFunctions/checkAdmin");
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
