const Comment = require("../s-models/comment");
const Post = require("../s-models/post");
const moment = require('moment-timezone');

exports.createComment = async  (req, res)=> {
    try {
        const { postID, userId, commentMessage, commentPrice } = req.body

        const comment = new Comment({ desc: commentMessage, price: commentPrice, postId: postID, publishedBy: userId, createdAt: moment().tz("Asia/Jerusalem").format() });
        await comment.save();
        const comments = await findCommentsByPostId(postID)
        const commentLength = comments.length
        res.send({ posted: true, comment, commentLength });
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.deleteComment = async  (req, res)=> {
    try {
        const { commentId } = req.body
        const deleteCommentFunc = await deleteComment(commentId)

        res.send({ deleted: true, deleteCommentFunc })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.getPostsComments = async  (req, res)=> {
    try {
        const postId = req.params.id
        // const post = await findPostById(postId)
        const comments = await findCommentsByPostId(postId)
        const whenPostedArray = []


        for (i = 0; i < comments.length; i++) {
            const commentCreatedTime = Date.parse(comments[i].createdAt);
            let whenPosted = await howLongAgoPosted(commentCreatedTime)
            let whenPostedInfo = { timeAgo: `${whenPosted}`, commentId: `${comments[i]._id}` }
            whenPostedArray.push(whenPostedInfo)
        }

        res.send({ comments, whenPostedArray })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.addLike = async  (req, res)=> {
    try {
        const { commentId, userId } = req.body
        const addLike = await addLikeToComment(commentId, userId)

        res.send({ liked: true })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.deleteLike = async  (req, res)=> {
    try {
        const { commentId, userId } = req.body
        const deleteLike = await deleteLikeToComment(commentId, userId)

        res.send({ deleted: true })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.checkHowMuchLiked = async  (req, res)=> {
    try {
        const { commentId } = req.body
        const checkLikeAmount = await checkHowMuchLikesComment(commentId)
        const whoLiked = checkLikeAmount[0].likes
        const likeAmount = checkLikeAmount[0].likes.length

        res.send({ likeAmount, whoLiked })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.checkHowMuchComments = async  (req, res)=> {
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
exports.checkIfUserLiked = async  (req, res)=> {
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
const howLongAgoPosted = async (date) => {
    let israel = moment().tz("Asia/Jerusalem").format()
    const x = Date.parse(israel)
    let seconds = Math.floor((x - date) / 1000);


    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " שנים";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " חודשים";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " ימים";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " שעות";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " דקות";
    }
    return Math.floor(seconds) + " שניות";
}