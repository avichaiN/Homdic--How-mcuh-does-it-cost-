const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const checkUserToken = require("./gFunctions/checkUserToken");

router.post("/", checkUserToken, async (req, res) => {

    const {user,categoryId,title,desc,img} = req.body

    const post = new Post({ title:title,desc:desc,img:img,categoryId: categoryId, publishedBy: user });
    try {
        await post.save();
        res.send({ posted:true,post });
    } catch (e) {
        console.log(e.message)
        res.send({posted:false})
    }
  });

module.exports = [router];
