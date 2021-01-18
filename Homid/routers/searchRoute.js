const express = require('express');
const Post = require('../models/post');

const router = express.Router();
let postsId = ''

const searcRegExp = (searched) => {
    return Post.find({ $or: [{ title: { $regex: searched, $options: "" } }, { desc: { $regex: searched, $options: "" } }] }).exec()
}

router.post('/', async (req, res) => {
    const { searched } = req.body
    const searchClean = searched.trim()
    postsId = ''
    let searchRes = await searcRegExp(searchClean)
    searchRes.forEach(post=>{
        postsId += `${post._id},`
    })
    res.send({postsId})

})
const findPostById = (id) =>{
    return Post.findById(id).exec()
}

router.use('/:id',async (req,res)=>{
    let foundPosts = []
    let splitedIDs = req.params.id.split(',')
    splitedIDs.pop() 

    for(i=0;i<splitedIDs.length;i++){
        let post = await findPostById(splitedIDs[i])
        foundPosts.push(post)
    }
    res.send({foundPosts})
})

module.exports = router;