const Post = require("../s-models/post");
const Comment = require("../s-models/comment");

const User = require("../s-models/user");
const sharp = require("sharp");
const mongoose = require("mongoose");
const moment = require('moment-timezone');

exports.createPost = async function (req, res) {
    try {
        console.log(moment().tz("Asia/Jerusalem").format())
        const { userId, categoryId, title, desc } = req.body;

        const post = new Post({
            title: title,
            desc: desc,
            categoryId: categoryId,
            publishedBy: userId,
            createdAt: moment().format()
        });
        if (req.file) {
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
        res.send({ status: "unauthorized" });
    }
};
exports.deletePost = async function (req, res) {
    try {
        const { postId } = req.body;

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
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.getPostsByCategory = async function (req, res) {
    try {
        chosenCategoryId = req.params.id;
        let foundPostsByCategoryId = await Post.aggregate([
            { $match: { categoryId: chosenCategoryId } },
        ])

        res.send({ foundPostsByCategoryId });
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.getPostsByKeywords = async function (req, res) {
    try {
        const searchedKeywords = req.params.id;
        const searchedSplitted = searchedKeywords.replace(/[-]+/, " ");
        let foundPosts = await searchRegExp(searchedSplitted);


        res.send({ foundPosts, searchedSplitted });
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.getPostsByUser = async function (req, res) {
    try {
        const { userId } = req.body;
        let foundPosts = await findPostsByUser(userId);
        res.send({ foundPosts, ok: true });
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.getPostsByUserAdmin = async function (req, res) {
    try {
        const { userId } = req.body;
        let userInfo = await findUserById(userId);
        let foundPosts = await findPostsByUser(userId);
        res.send({ foundPosts, ok: true, userInfo });
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.addPostToFavorite = async function (req, res) {
    try {
        const { postID, userId } = req.body;
        let checkIfAlreadyFav = await checkIfPostInFavorite(postID, userId);
        if (checkIfAlreadyFav) {
            res.send({ fav: false });
        } else {
            const addToFavPost = await addPostToFavorite(postID, userId);
            res.send({ fav: true });
        }
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.deletePostFromFavorite = async function (req, res) {
    try {
        const { postID, userId } = req.body;
        const deleteFromFavoritePosts = await deletePostFromFavorite(postID, userId);
        res.send({ deleted: true });
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.checkIfPostFavorite = async function (req, res) {
    try {
        const { postID, userId } = req.body;
        let checkIfAlreadyFav = await checkIfPostInFavorite(postID, userId);
        if (checkIfAlreadyFav) {
            res.send({ checkFav: true });
        } else {
            res.send({ checkFav: false });
        }
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
exports.getFavoritePosts = async function (req, res) {
    try {
        const userId = req.params.id;
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
        res.send({ status: "unauthorized" });
    }
};

exports.getUserWhoPostedName = async function (req, res) {
    try {
        const userId = req.params.id
        const userFNameLName = await getFnameAndlName(userId)
        res.send({ userFNameLName })
    } catch (e) {
        console.log(e.message);
        res.send({ status: "unauthorized" });
    }
};
const searchRegExp = async (searched) => {
    // return Post.find({$or: [{ title: { $regex: searched, $options: "" } },{ desc: { $regex: searched, $options: "" } },],}).exec();
    let foundPosts = await Post.aggregate([{ $match: { "desc": { $regex: searched, $options: "i" } } }])
    return foundPosts

};
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

const findUserById = (userId) => {
    return User.findOne({ _id: userId }).exec();
};
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
const getFnameAndlName = async (userId) => {
    let user = await User.findById({ _id: userId }).exec()
    return {fName:user.firstName, lName:user.lastName}
}