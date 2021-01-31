const express = require("express");
const Post = require("../models/post");
const Comment = require("../models/comment");
const checkUserToken = require("./gFunctions/checkUserToken");
const checkAdmin = require("./gFunctions/checkAdmin");
const router = express.Router();
const User = require("../models/user");
const multer = require("multer");
const sharp = require("sharp");
const mongoose = require("mongoose");









router.get("/get/:id", checkUserToken, async (req, res) => {
  chosenCategoryId = req.params.id;

  let foundPostsByCategoryId = await Post.aggregate([
    { $match: { categoryId: chosenCategoryId } },
  ]);


  res.send({ foundPostsByCategoryId });
});

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



router.post("/", uploadImg.single("img"), async (req, res) => {

  const { userId, userFname, userLname, categoryId, title, desc } = req.body;

  try {
    const post = new Post({
      title: title,
      desc: desc,
      categoryId: categoryId,
      fName: userFname,
      lName: userLname,
      publishedBy: userId,
    });

    if(req.file){
      const Buffer = await sharp(req.file.buffer)
      .resize({ width: 240, high: 240 })
      .toBuffer();
      post.img = Buffer
      post.imgName = req.file.name
    }

    await post.save(post);

    res.send({ posted: true, post });
  } catch (e) {
    console.log(e.message);
    res.send({ posted: false, error: e.message });
  }
});

const searchRegExp = async (searched) => {
  // return Post.find({$or: [{ title: { $regex: searched, $options: "" } },{ desc: { $regex: searched, $options: "" } },],}).exec();
  let foundPosts = await Post.aggregate([{ $match: { "desc": { $regex: searched, $options: "i" } } }])
  return foundPosts

};

router.get("/search/get/:id", checkUserToken, async (req, res) => {
  const searchedKeywords = req.params.id;
  const searchedSplitted = searchedKeywords.replace(/[-]+/, " ");
  let foundPosts = await searchRegExp(searchedSplitted);


  res.send({ foundPosts, searchedSplitted });
});

//delete post by _id
router.delete("/", checkUserToken, async (req, res) => {
  const { postId } = req.body;

  try {
    await Post.findOneAndRemove({ _id: postId }, async function (err, post) {
      if (err) {

        res.send({ deleted: false });
      } else {
        await deletePostComments(postId);
        await deleteFromFavorites(postId)
        res.send({ deleted: true });
      }
    });
  } catch (e) {
    console.log(e);
    res.send({ deleted: false });
  }
});
const deletePostComments = async (postId) => {
  return Comment.deleteMany({ postId: postId }).exec();
};
const deleteFromFavorites = async (postId) => {
  let userWhoFavorites = await User.aggregate([
    { $match: { favPosts: postId } },
  ]);
  userWhoFavorites.forEach(async user => {
    await deletePostFromFavorite(postId, user._id)
  })
}

const findPostsByUser = (userId) => {
  return Post.aggregate([{ $match: { publishedBy: userId } },]).exec()
};
router.post("/user/get", checkUserToken, async (req, res) => {
  try {
    const { userId } = req.body;
    let foundPosts = await findPostsByUser(userId);

    res.send({ foundPosts, ok: true });
  } catch (e) {
    console.log(e.message);
    res.send({ ok: false });
  }
});

//find user posts FOR ADMIN ONLy

const findUserById = (userId) => {
  return User.findOne({ _id: userId }).exec();
};
router.post("/admin/user/get", checkAdmin, async (req, res) => {
  try {
    const { userId } = req.body;
    let userInfo = await findUserById(userId);
    let foundPosts = await findPostsByUser(userId);
    res.send({ foundPosts, ok: true, userInfo });
  } catch (e) {
    console.log(e.message);
    res.send({ ok: false });
  }
});

// add post to fav posts
const addPostToFavorite = async (postID, userId) => {
  return User.findOneAndUpdate(
    { _id: userId },
    { $push: { favPosts: postID } }
  ).exec();
};
const deletePostFromFavorite = async (postID, userId) => {
  return User.findOneAndUpdate(
    { _id: userId },
    { $pull: { favPosts: postID } }
  ).exec();
};
const checkIfPostInFavorite = async (postID, userId) => {
  let checkIfFavorite = false;
  const user = await User.find({ _id: userId });
  const favoriteArray = user[0].favPosts;
  checkIfFavorite = favoriteArray.includes(postID);

  if (checkIfFavorite) {
    return true;
  } else {
    return false;
  }
};
router.post("/favorite/add", checkUserToken, async (req, res) => {
  const { postID, userId } = req.body;
  let checkIfAlreadyFav = await checkIfPostInFavorite(postID, userId);
  if (checkIfAlreadyFav) {
    res.send({ fav: false });
  } else {
    const addToFavPost = await addPostToFavorite(postID, userId);
    res.send({ fav: true });
  }
});
router.delete("/favorite/delete", checkUserToken, async (req, res) => {
  const { postID, userId } = req.body;
  const deleteFromFavoritePosts = await deletePostFromFavorite(postID, userId);
  res.send({ deleted: true });
});
router.post("/favorite/check", checkUserToken, async (req, res) => {
  const { postID, userId } = req.body;
  let checkIfAlreadyFav = await checkIfPostInFavorite(postID, userId);
  if (checkIfAlreadyFav) {
    res.send({ checkFav: true });
  } else {
    res.send({ checkFav: false });
  }
});
const getUserFavoritePostsId = (userId) => {
  return User.findOne({ _id: userId }).exec();
};
const findPostById = async (postId) => {
  const ObjectId = mongoose.Types.ObjectId;
  return Post.aggregate([
    {
      $match: { _id: ObjectId(`${postId}`) }
    }
  ])

};
router.post("/favorites/getall", checkUserToken, async (req, res) => {
  try {
    const { userId } = req.body;
    const userInfo = await getUserFavoritePostsId(userId);
    const favPostsIds = userInfo.favPosts;
    let favPosts = [];

    for (i = 0; i < favPostsIds.length; i++) {
      let post = await findPostById(favPostsIds[i]);
      favPosts.push(post);
    }
    res.send({ favPosts });
  } catch (e) {
    console.log(e.message);
    res.send({ error: true });
  }
});

module.exports = [router];
