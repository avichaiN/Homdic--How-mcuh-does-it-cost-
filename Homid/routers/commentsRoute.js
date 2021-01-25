const express = require("express");
const router = express.Router();
const Comments = require("../models/comment");
const Post = require("../models/post");
const checkUserToken = require("./gFunctions/checkUserToken");
const path = require('path')


// this finds post by id, finds comments by post id, and send back to client.
router.get('/:id', checkUserToken, async (req, res) => {
  const postId = req.params.id
  const post = await findPostById(postId)
  const comments = await findCommentsByPostId(postId)

  res.send({post, comments})
})
const findPostById = async (postId) => {
  return Post.findById({ _id: postId }).exec()
}
const findCommentsByPostId = async (postId) => {
  return await Comments.aggregate([{ $match: { postId: postId } }])
}


router.post("/", checkUserToken, async (req, res) => {

  const { userId, userFname, userLname, postId, desc, price, publishedBy } = req.body

  const post = new Post({ desc: desc, price: price, postId: postId, fName: userFname, lName: userLname, publishedBy: userId });
  try {
    await Comments.save();
    res.send({ posted: true, post });
  } catch (e) {
    console.log(e.message)
    res.send({ posted: false })
  }
});

module.exports = router