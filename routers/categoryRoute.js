const express = require("express");
const Post = require("../models/post");
const Comment = require("../models/comment");
const checkUserToken = require("../routers/gFunctions/checkUserToken");
const checkAdmin = require("../routers/gFunctions/checkAdmin");
const router = express.Router();
const Category = require("../models/category");
const multer = require("multer");
const sharp = require("sharp");



const cookieParser = require("cookie-parser");
router.use(cookieParser());

//const path = require("path");


// get all categories to display on category page.
router.get("/", checkUserToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Categories.html"));
});
const uploadImg = multer({
  limits: {
    fileSize: 5000000, // 5 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("please upload image file"));
    }
    cb(undefined, true);
  },
});


router.get("/get", checkUserToken, async (req, res) => {
  try {
  let categories = await categoriesFind()

  if (categories === false || categories === undefined) {
    res.send({ ok: false });
  } else {
  res.send({ categories });
  }
  } catch (e) {
    res.send({ ok: false });
  }
})

const categoriesFind = async () => {
  try {
    return  Category.aggregate([{ $match: {  } },]);
  } catch (e) {
    console.log(e);
  }
}
//create new category for admin
router.post("/", checkAdmin, uploadImg.single("img"), async (req, res) => {
  const { newCategoryName } = req.body;
  try {
    const Buffer = await sharp(req.file.buffer)
      .resize({ width: 120, high: 120 })
      .toBuffer();


    const category = new Category({
      img: Buffer,
      Name: newCategoryName,
      createdAt: new Date(Date.now())
    });

    await category.save();
    let categories = await categoriesFind();
    console.log(categories)
    res.send({ ok: true, categories });
  } catch (e) {
    console.log(e);
    res.send({ ok: false });
  }
});
router.put("/", checkAdmin, async (req, res) => {
  const { categoryId, newCategoryName, newCategoryImg } = req.body;

  try {
    await Category.findOneAndUpdate(
      { _id: categoryId },
      { Img: newCategoryImg, Name: newCategoryName },
      async function (err, category) {
        if (err) {
          console.log(err);
          res.send({ ok: false });
        } else {
          let categories = await categoriesFind();
          res.send({ ok: true, category, categories });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});
router.delete("/", checkAdmin, async (req, res) => {
  const { chosenCategoryid } = req.body;

  try {
    await Category.findOneAndDelete(
      { _id: chosenCategoryid },
      async function (err, category) {
        if (err) {
          res.send({ ok: false });
        } else {
          await findPostsCategoryAndDelete(chosenCategoryid)
          let categories = await categoriesFind();

          res.send({ ok: true, category, categories });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.send({ ok: false });
  }
});
const findPostsCategoryAndDelete = async (categoryId) => {
  await Post.find(
    { categoryId: categoryId },
    async function (err, posts) {
      if (err) {
        console.log(err.commentMessage)
      } else {
        posts.forEach(async post => {
          await deletePostComments(post._id)
          await deletePost(post._id)
        })
      }
    })
}
const deletePost = async (postId) => {
  return Post.findOneAndDelete({ _id: postId }).exec();
};

const deletePostComments = async (postId) => {
  return Comment.deleteMany({ postId: postId }).exec();
};
const getCategoryInfo = (id) => {
  try {
    return Category.find({ _id: id }).exec()
  } catch (error) {
    console.log(error);
  }

}
router.post('/byid', async (req, res) => {
  const { categoryId } = req.body
  let categoryInfo = await getCategoryInfo(categoryId)
  res.send({ categoryInfo })
})

module.exports = [router];
