const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const checkUserToken = require("./gFunctions/checkUserToken");
const checkAdmin = require("./gFunctions/checkAdmin");
const path = require('path')


router.get('/get/:id', checkUserToken, async (req, res) => {
    chosenCategoryId = req.params.id

    let foundPostsByCategoryId = await Post.aggregate([
        { $match: { categoryId: chosenCategoryId } }
    ])

    res.send({ foundPostsByCategoryId })
})

router.post("/", checkUserToken, async (req, res) => {

    const { user, categoryId, title, desc, img } = req.body

    const post = new Post({ title: title, desc: desc, img: img, categoryId: categoryId, publishedBy: user });
    try {
        await post.save();
        res.send({ posted: true, post });
    } catch (e) {
        console.log(e.message)
        res.send({ posted: false })
    }
});


const searchRegExp = (searched) => {
    return Post.find({ $or: [{ title: { $regex: searched, $options: "" } }, { desc: { $regex: searched, $options: "" } }] }).exec()
}

router.get('/search/get/:id', checkUserToken, async (req, res) => {
    const searchedKeywords = req.params.id
    const searchedSplitted = searchedKeywords.replace(/[-]+/, ' ')

    let foundPosts = await searchRegExp(searchedSplitted)

    res.send({foundPosts,searchedSplitted })
})

//delete post by _id
router.delete("/", checkAdmin, async (req, res) => {
    const { postId } = req.body;
  
    try {
      await Post.findOneAndRemove(
        { _id: postId },
        async function (err, post) {
          if (err) {
            res.send({ deleted:false });
          } else {
            res.send({ deleted:true });
          }
        }
      );
    } catch (e) {
      console.log(e);
      res.send({ deleted:false });
    }
  });

//get posts by user id

const findPostsByUser = (userId) => {
  return Post.find({ publishedBy:userId }).exec()
}
router.post("/user/get", checkUserToken, async (req, res) => {
  try {
    const {userId} = req.body
    let foundPosts = await findPostsByUser(userId)
    res.send({foundPosts, ok:true})
  } catch (e) {
      console.log(e.message)
      res.send({ ok:false })
  }
});

//find user posts FOR ADMIN ONLy

const findUserById = (userId) => {
  return User.findOne({ _id:userId }).exec()
}
router.post("/admin/user/get", checkAdmin, async (req, res) => {
  try {
    const {userId} = req.body
    let userInfo = await findUserById(userId)
    let foundPosts = await findPostsByUser(userId)
    res.send({foundPosts, ok:true,userInfo})
  } catch (e) {
      console.log(e.message)
      res.send({ ok:false })
  }
});
module.exports = [router];
