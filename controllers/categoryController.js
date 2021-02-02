const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Category = require("../models/category");
const sharp = require("sharp");
const path = require("path");

const categoriesFind = async () => {
    try {
        return Category.aggregate([{ $match: {} },]);
    } catch (e) {
        console.log(e);
    }
}
const findPostsCategoryAndDelete = async (categoryId) => {
    await Post.find(
        { categoryId: categoryId },
        async function (err, posts) {
            if (err) {

            } else {
                posts.forEach(async post => {
                    await deleteFromFavorites(post._id)
                    await deletePostComments(post._id)
                    await deletePost(post._id)
                })
            }
        })
}
const deleteFromFavorites = async (postId) => {
    let userWhoFavorites = await User.aggregate([
        { $match: { favPosts: `${postId}` } },
    ]);

    userWhoFavorites.forEach(async user => {
        await deletePostFromFavorite(postId, user._id)
    })
}
const deletePostFromFavorite = async (postID, userId) => {
    return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { favPosts: postID } }
    ).exec();
};

const deletePost = async (postId) => {
    return Post.findOneAndDelete({ _id: postId }).exec();
};

const deletePostComments = async (postId) => {
    return Comment.deleteMany({ postId: postId }).exec();
};
const getCategoryInfo = (id) => {
    try {
        const ObjectId = mongoose.Types.ObjectId;
        return Category.aggregate([
            {
                $match: { _id: ObjectId(`${id}`) }
            }
        ])
    } catch (error) {
        console.log(error);
    }
}

exports.goToCategoryPage = function (req, res) {
    try {
        res.sendFile(path.join(__dirname, "../public", "Categories.html"));
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
};


exports.createCategory = async function (req, res) {
    try {
        const { newCategoryName } = req.body;
        const Buffer = await sharp(req.file.buffer)
            .resize({ width: 240, high: 240 })
            .toBuffer();


        const category = new Category({
            img: Buffer,
            Name: newCategoryName,
            createdAt: new Date(Date.now())
        });

        await category.save();
        let categories = await categoriesFind();
        res.send({ ok: true, categories });

    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
};


exports.editCategory =  async function (req, res) {
    const { categoryId, newCategoryName, newCategoryImg } = req.body;

    try {
        if (req.file) {
            const Buffer = await sharp(req.file.buffer)
                .resize({ width: 240, high: 240 })
                .toBuffer();
            await Category.findOneAndUpdate(
                { _id: categoryId },
                { img: Buffer, Name: newCategoryName },
                async (err, category) => {
                    if (err) {
                        // console.log(err);
                        res.send({ ok: false });
                    } else {
                        let categories = await categoriesFind();
                        res.send({ ok: true, category, categories });
                    }
                }
            );
        } else {
            await Category.findOneAndUpdate(
                { _id: categoryId },
                { Name: newCategoryName },
                async (err, category) => {
                    if (err) {
                        // console.log(err);
                        res.send({ ok: false });
                    } else {
                        let categories = await categoriesFind();
                        res.send({ ok: true, category, categories });
                    }
                }
            );
        }
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
};


exports.deleteCategory = async function (req, res) {
    try {
        const { chosenCategoryid } = req.body;
        await Category.findOneAndDelete(
            { _id: chosenCategoryid },
            async function (err, category) {
                if (err) {
                    res.send({ ok: false });
                } else {
                    let deletePostCommentsFavorites = await findPostsCategoryAndDelete(chosenCategoryid)
                    let categories = await categoriesFind();
                    res.send({ ok: true, categories });
                }
            }
        );
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
};

exports.getCategories = async function (req, res) {
    try {
        let categories = await categoriesFind()

        if (categories === false || categories === undefined) {
            res.send({ ok: false });
        } else {
            res.send({ categories });
        }
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
};

exports.getCategoryInfo = async function (req, res) {
    try {
        const categoryId = req.params.id
        let categoryInfo = await getCategoryInfo(categoryId)
        res.send({ categoryInfo })
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
};
