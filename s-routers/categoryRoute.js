const express = require("express");
const checkUserToken = require("../s-routers/gFunctions/checkUserToken");
const categoryController = require("../s-controllers/categoryController");
const checkAdmin = require("../s-routers/gFunctions/checkAdmin");
const router = express.Router();
const multer = require("multer");


const uploadImg = multer({
  limits: {
      fileSize: 10000000, // 10 MB
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error("please upload image file"));
      }
      cb(undefined, true);
  },
});


router
.route("/")
.get(checkUserToken, categoryController.goToCategoryPage)
.post(checkAdmin, uploadImg.single("img"),categoryController.createCategory)
.put(checkAdmin,uploadImg.single("img"), categoryController.editCategory)
.delete(checkAdmin, categoryController.deleteCategory)

router
.route("/get")
.get(checkUserToken, categoryController.getCategories)

router
.route("/:id")
.get(categoryController.getCategoryInfo)

module.exports = router