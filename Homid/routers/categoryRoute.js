const express = require("express");
const Category = require("../models/category");
const jwt = require("jwt-simple");
const cookieParser = require("cookie-parser");
const checkUserToken = require("../routers/gFunctions/checkUserToken");
const checkAdmin = require("../routers/gFunctions/checkAdmin");
const path = require("path");

const router = express.Router();

router.use(cookieParser());

async function categoriesFind() {
  try {
    return Category.find({}).exec();
  } catch (e) {
    console.log(e);
  }
}

// get all categories to display on category page.
router.get("/", checkUserToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "Categories.html"));
});

router.get("/get", checkUserToken, async (req, res) => {
  try {
    let categories = await categoriesFind();

    if (categories === false || categories === undefined) {
      res.send({ ok: false });
    } else {
      res.send({ ok: true, categories });
    }
  } catch (e) {
    res.send({ ok: false });
  }
});

//create new category for admin
router.post("/", checkAdmin, async (req, res) => {
  const { newCategoryName } = req.body;
  const { newCategoryImg } = req.body;

  const category = new Category({ Name: newCategoryName, Img: newCategoryImg });
  try {
    await category.save();
    let categories = await categoriesFind();
    res.send({ ok: true, category, categories });
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
    await Category.findOneAndRemove(
      { _id: chosenCategoryid },
      async function (err, category) {
        if (err) {
          res.send({ ok: false });
        } else {
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

module.exports = router;
