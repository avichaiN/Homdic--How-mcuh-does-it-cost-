const Comment = require("../models/comment");
const Post = require("../models/post");

exports.createComment = async function (req, res) {
    try {
        const { postID, userId, fName, lName, commentMessage, commentPrice } = req.body

        const comment = new Comment({ desc: commentMessage, price: commentPrice, postId: postID, fName: fName, lName: lName, publishedBy: userId });
        await comment.save();
        const comments = await findCommentsByPostId(postID)
        const commentLength = comments.length
        res.send({ posted: true, comment, commentLength });
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.deleteComment = async function (req, res) {
    try {
        const { commentId } = req.body
        const deleteCommentFunc = await deleteComment(commentId)

        res.send({ deleted: true,deleteCommentFunc })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.getPostsComments = async function (req, res) {
    try {
        const postId = req.params.id
        const post = await findPostById(postId)
        const comments = await findCommentsByPostId(postId)

        res.send({ post, comments })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.addLike = async function (req, res) {
    try {
        const { commentId, userId } = req.body
        const addLike = await addLikeToComment(commentId, userId)

        res.send({ liked: true })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.deleteLike = async function (req, res) {
    try {
        const { commentId, userId } = req.body
        const deleteLike = await deleteLikeToComment(commentId, userId)

        res.send({ deleted: true })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.checkHowMuchLiked = async function (req, res) {
    try {
        const { commentId } = req.body
        const checkLikeAmount = await checkHowMuchLikesComment(commentId)
        const likeAmount = checkLikeAmount[0].likes.length

        res.send({ likeAmount })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.checkHowMuchComments = async function (req, res) {
    try {
        const { postId } = req.body
        const comments = await findCommentsByPostId(postId)
        const commentLength = comments.length
        res.send({ commentLength })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.checkIfUserLiked = async function (req, res) {
    try {
        const { commentId, userId } = req.body
        let checkLike = await checkIfUserLikedComment(commentId, userId)

        res.send({ checkLike })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};

const deleteComment = (commentId) => {
    return Comment.findOneAndDelete({ _id: commentId }).exec()
}
const findPostById = async (postId) => {
    return Post.findById({ _id: postId }).exec()
}
const findCommentsByPostId = async (postId) => {
    return await Comment.aggregate([{ $match: { postId: postId } }])
}
const addLikeToComment = async (commentId, userId) => {
    return Comment.findOneAndUpdate({ _id: commentId }, { $push: { likes: userId } }).exec()
}
const deleteLikeToComment = async (commentId, userId) => {
    return Comment.findOneAndUpdate({ _id: commentId }, { $pull: { likes: userId } }).exec()
}
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