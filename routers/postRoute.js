const express = require("express");
const formidable = require('formidable');
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const checkUserToken = require("./gFunctions/checkUserToken");
const checkAdmin = require("./gFunctions/checkAdmin");
const path = require('path')
var moment = require('moment');



router.get('/get/:id', checkUserToken, async (req, res) => {
  chosenCategoryId = req.params.id

  let posts = await Post.aggregate([
    { $match: { categoryId: chosenCategoryId } }
  ])

  const foundPostsByCategoryId = posts.sort((a, b) => {
    return moment(b.createdAt).diff(a.createdAt);
  });

  res.send({ foundPostsByCategoryId })
})



router.post("/", checkUserToken, async (req, res) => {

  var file = req.body.img;

  var filename = `/.//styles/img/${path.parse(file).base}`;

  const { userId, userFname, userLname, categoryId, title, desc, img } = req.body

  const post = new Post({ title: title, desc: desc, img: filename, categoryId: categoryId, fName: userFname, lName: userLname, publishedBy: userId });
  try {


    //////////////upload the file section/////////////////
    let form = new formidable.IncomingForm();
    form.parse(req);
    console.log(__dirname + '/public/style/img/')
    form.on('fileBegin', function (name, file) { file.path = path.dirname(__dirname) + '/public/styles/img/' + file.name; })
    form.on('file', function (name, file) {
      console.log("Uploaded file", file.name);
    });
    ////////////////////////////////////////////////////////////////

    await post.save(req);
    res.send({ posted: true, post });
  } catch (e) {
    console.log(e.message)
    res.send({ posted: false })
  }
});


//i try to mack a function to upload the file but its not working
const fileUpload = (req) => {
  let form = new formidable.IncomingForm();
  form.parse(req);
  console.log(__dirname + '/public/style/img/')
  form.on('fileBegin', function (name, file) { file.path = path.dirname(__dirname) + '/public/styles/img/' + file.name; })
  form.on('file', function (name, file) {
    console.log("Uploaded file", file.name);
  });
}


const searchRegExp = (searched) => {
  return Post.find({ $or: [{ title: { $regex: searched, $options: "" } }, { desc: { $regex: searched, $options: "" } }] }).exec()
}

router.get('/search/get/:id', checkUserToken, async (req, res) => {
  const searchedKeywords = req.params.id
  const searchedSplitted = searchedKeywords.replace(/[-]+/, ' ')

  let posts = await searchRegExp(searchedSplitted)

  const foundPosts = posts.sort((a, b) => {
    return moment(b.createdAt).diff(a.createdAt);
  });

  res.send({ foundPosts, searchedSplitted })
})

//delete post by _id
router.delete("/", checkUserToken, async (req, res) => {
  const { postId } = req.body;

  try {
    await Post.findOneAndRemove(
      { _id: postId },
      async function (err, post) {
        if (err) {
          res.send({ deleted: false });
        } else {
          let deleteComments = await deletePostComments(postId)
          res.send({ deleted: true });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.send({ deleted: false });
  }
});
const deletePostComments = async (postId) => {
  return Comment.deleteMany({postId: postId}).exec()
}

//get posts by user id

const findPostsByUser = (userId) => {
  return Post.find({ publishedBy: userId }).exec()
}
router.post("/user/get", checkUserToken, async (req, res) => {
  try {
    const { userId } = req.body
    let posts = await findPostsByUser(userId)

    const foundPosts = posts.sort((a, b) => {
      return moment(b.createdAt).diff(a.createdAt);
    });
    res.send({ foundPosts, ok: true })
  } catch (e) {
    console.log(e.message)
    res.send({ ok: false })
  }
});

//find user posts FOR ADMIN ONLy

const findUserById = (userId) => {
  return User.findOne({ _id: userId }).exec()
}
router.post("/admin/user/get", checkAdmin, async (req, res) => {
  try {
    const { userId } = req.body
    let userInfo = await findUserById(userId)
    let foundPosts = await findPostsByUser(userId)
    res.send({ foundPosts, ok: true, userInfo })
  } catch (e) {
    console.log(e.message)
    res.send({ ok: false })
  }
});
module.exports = [router];
