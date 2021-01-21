const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const checkUserToken = require("./gFunctions/checkUserToken");
const path = require('path')


router.get('/:id', checkUserToken, async (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "posts.html"));
})


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

router.get('/search/:id', checkUserToken, async (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "posts.html"));
})
router.post('/search/getPostsId',checkUserToken,async(req,res)=>{
    let postsId = []
    const { searched } = req.body
    const searchClean = searched.trim()
    let getPosts = await searcRegExp(searchClean)

    getPosts.forEach(post=>{
        postsId.push(post._id)
    })
    console.log(postsId)
    res.send({postsId})
})
const searcRegExp = (searched) => {
    return Post.find({ $or: [{ title: { $regex: searched, $options: "" } }, { desc: { $regex: searched, $options: "" } }] }).exec()
}
const searchId = (id) => {
    return Post.find({ _id:id }).exec()
}
router.get('/search/get/:id', checkUserToken, async (req, res) => {
    const foundPostsId = req.params.id
    const foundPostsIdArray = foundPostsId.split(',')
    let foundPostsArray = []
    await foundPostsIdArray.forEach(async id=>{
        let foundPost = await searchId(id)
        foundPostsArray.push(foundPost)
    })
    console.log(foundPostsArray)
})

module.exports = [router];
