const express = require("express");
const router = express.Router();
const comments = require("../models/comments");
const checkUserToken = require("./gFunctions/checkUserToken");
const path = require('path')

router.get('/:id', checkUserToken, async (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "comments.html"));
})


router.get('/get/:id', checkUserToken, async (req, res) => {
    chosenPostId = req.params.id
  
    let foundCommentsByPostId = await Post.aggregate([
      { $match: { postId: chosenPostId } }
    ])
  
    res.send({ foundCommentsByPostId })
  })
  
  router.post("/", checkUserToken, async (req, res) => {
  
    const { userId, userFname, userLname, postId, desc, price, publishedBy } = req.body
  
    const post = new Post({ desc: desc, price: price, postId: postId, fName: userFname, lName:userLname, publishedBy: userId });
    try {
      await post.save();
      res.send({ posted: true, post });
    } catch (e) {
      console.log(e.message)
      res.send({ posted: false })
    }
  });
  