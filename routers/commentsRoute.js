const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const Post = require("../models/post");
const checkUserToken = require("./gFunctions/checkUserToken");


// this finds post by id, finds comments by post id, and send back to client.
router.get('/:id', checkUserToken, async (req, res) => {
  try {

    const postId = req.params.id
    const post = await findPostById(postId)
    const comments = await findCommentsByPostId(postId)

    res.send({ post, comments })
  } catch (e) {
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

  const comment = new Comment({ desc: commentMessage, price: commentPrice, postId: postID, fName: fName, lName: lName, publishedBy: userId });
  try {
    await comment.save();
    res.send({ posted: true, comment });
  } catch (e) {
    console.log(e.message)
    res.send({ posted: false })
  }
});
const deleteComment = (commentId) => {
  return Comment.findOneAndDelete({ _id: commentId }).exec()
}
router.delete("/", checkUserToken, async (req, res) => {
  const { commentId } = req.body
  const deleteCommentFunc = await deleteComment(commentId)

  res.send({ deleted: true })
});
const addLikeToComment = async (commentId, userId) => {
  return Comment.findOneAndUpdate({ _id: commentId }, { $push: { likes: userId } }).exec()
}
const deleteLikeToComment = async (commentId, userId) => {
  return Comment.findOneAndUpdate({ _id: commentId }, { $pull: { likes: userId } }).exec()
}
router.post("/like", checkUserToken, async (req, res) => {
  const { commentId, userId } = req.body
  const addLike = await addLikeToComment(commentId, userId)

  res.send({ liked: true })
});
router.delete("/like", checkUserToken, async (req, res) => {
  const { commentId, userId } = req.body
  const deleteLike = await deleteLikeToComment(commentId, userId)

  res.send({ deleted: true })
});
const checkIfUserLikedComment = async (commentId, userId) => {
  let checkIfUserLiked = false;
  const comment = await Comment.find({ _id: commentId })
  const commentsLikes = comment[0].likes
  checkIfUserLiked = commentsLikes.includes(userId)
  if (checkIfUserLiked) {
    return true
  } else {
    return false
  }
}
const checkHowMuchLikesComment = (commentId) => {
  return Comment.find({ _id: commentId }).exec()
}

router.post("/likedAmount", checkUserToken, async (req, res) => {
  const { commentId } = req.body
  const checkLikeAmount = await checkHowMuchLikesComment(commentId)
  const likeAmount = checkLikeAmount[0].likes.length

  res.send({ likeAmount })
});
router.post("/user/like/check", checkUserToken, async (req, res) => {
  const { commentId, userId } = req.body
  let checkLike = await checkIfUserLikedComment(commentId, userId)

  res.send({ checkLike })
});

module.exports = router