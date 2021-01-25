const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const Post = require("../models/post");
const checkUserToken = require("./gFunctions/checkUserToken");


// this finds post by id, finds comments by post id, and send back to client.
router.get('/:id', checkUserToken, async (req, res) => {
  try{

  const postId = req.params.id
  const post = await findPostById(postId)
  const comments = await findCommentsByPostId(postId)

  res.send({post, comments})
  }catch(e){
    console.log(e.message)
  }
})
const findPostById = async (postId) => {
  return Post.findById({ _id: postId }).exec()
}
const findCommentsByPostId = async (postId) => {
  return await Comment.aggregate([{ $match: { postId: postId } }])
}


router.post("/", checkUserToken, async (req, res) => {

  const { postID, userId, fName, lName, commentMessage, commentPrice } = req.body
  console.log(postID, userId, fName, lName, commentMessage, commentPrice)

  const comment = new Comment({ desc: commentMessage, price: commentPrice, postId: postID, fName: fName, lName: lName, publishedBy: userId });
  try {
    await comment.save();
    res.send({ posted: true, comment });
  } catch (e) {
    console.log(e.message)
    res.send({ posted: false })
  }
});

module.exports = router