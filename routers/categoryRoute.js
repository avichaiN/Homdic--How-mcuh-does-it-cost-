const express = require("express");
const checkUserToken = require("../routers/gFunctions/checkUserToken");
const categoryController = require("../controllers/categoryController");
const checkAdmin = require("../routers/gFunctions/checkAdmin");
const router = express.Router();
const multer = require("multer");


const uploadImg = multer({
  limits: {
      fileSize: 5000000, // 5 MB
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