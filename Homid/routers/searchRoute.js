const express = require('express');
const Post = require('../models/post');

const router = express.Router();



router.post('/', async (req, res) => {
    const { searched } = req.body
    const searchClean = searched.trim()

    res.send({ searchClean })

})

const searcRegExp = (searched) => {
    return Post.find({ $or: [{ title: { $regex: searched, $options: "" } }, { desc: { $regex: searched, $options: "" } }] }).exec()
}

router.use('/:keywords', async (req, res) => {
    let searched = req.params.keywords
    let posts = await searcRegExp(searched)
    if(posts.length === 0){
        res.send({ok:false})
    }else{
        res.send({ posts, ok:true })
    }
})

module.exports = router;