const express = require("express");
const checkUserToken = require("./gFunctions/checkUserToken");
const checkAdmin = require("./gFunctions/checkAdmin");
const router = express.Router();
const multer = require("multer");
const postsController = require("../s-controllers/postsController")

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
  .post(checkUserToken, uploadImg.single("img"), postsController.createPost)
  .delete(checkUserToken, postsController.deletePost)

router
  .route("/get/:id")
  .get(checkUserToken, postsController.getPostsByCategory)

router
  .route("/search/get/:id")
  .get(checkUserToken, postsController.getPostsByKeywords)

router
  .route("/user/get")
  .post(checkUserToken, postsController.getPostsByUser)

router
  .route("/user/:id")
  .get(checkUserToken, postsController.getUserWhoPostedName)

router
  .route("/admin/user/get")
  .post(checkAdmin, postsController.getPostsByUserAdmin)

router
  .route("/favorite")
  .post(checkUserToken, postsController.addPostToFavorite)
  .delete(checkUserToken, postsController.deletePostFromFavorite)

router
  .route("/favorites")
  .post(checkUserToken, postsController.checkIfPostFavorite)

router
  .route("/favorites/:id")
  .get(checkUserToken, postsController.getFavoritePosts)

router
  .route("/timeAgo")
  .post(checkUserToken, postsController.timeAgo)

module.exports = router