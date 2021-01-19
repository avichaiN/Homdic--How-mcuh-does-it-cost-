const express = require('express');
const Category = require('../models/category');
const jwt = require("jwt-simple");
const cookieParser = require("cookie-parser");
const path = require('path')
// לזכור להעלים מפה את הסיקרט ולשים בתוך קובץ .env
const secret = "temporary";

const router = express.Router();

router.use(cookieParser());

const checkUserToken = async (req, res, next) => {
    const token = req.cookies.userLoggedIn;
    if (token) {
      var decoded = jwt.decode(token, secret);
      req.userInfo = decoded;
      next();
    } else {
        console.log('er')
        res.sendFile(path.join(__dirname, '../public/index.html'))

    //   res.send({ user: "unauthorized" });
    }
  };

function checkAdmin(req, res, next) {
    const token = req.cookies.userLoggedIn

    if(token){
        var decoded = jwt.decode(token, secret);
        console.log(decoded.role)
        if(decoded.role==='admin'){
            next()
        }else{
            res.send({admin:false})
        }
    }else{
        res.send({admin:false})
    }
}
async function categoriesFind() {
    try {
        return Category.find({}).exec()

    } catch (e) {
        console.log(e)
    }
}

// get all categories to display on category page.
router.get('/', checkUserToken ,async (req, res) => {
    console.log('123')
    try {
        let categories = await categoriesFind()
        if (categories === false || categories === undefined) {
            res.send({ ok: false })
        } else {
            res.send({ ok: true, categories })
        }
    } catch (e) {
        res.send({ ok: false })
    }
})

//create new category for admin
router.post('/', checkAdmin, async (req, res) => {
    const { newCategoryName } = req.body
    const { newCategoryImg } = req.body

    console.log(newCategoryName)
    console.log(newCategoryImg)

    const category = new Category({ Name: newCategoryName, Img: newCategoryImg })
    try {
        await category.save()
        let categories = await categoriesFind()
        res.send({ ok: true, category, categories })
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})
router.put('/',checkAdmin, async (req, res) => {
    const { categoryId, newCategoryName, newCategoryImg } = req.body

    try {
        await Category.findOneAndUpdate({ _id: categoryId },
            { Img: newCategoryImg, Name: newCategoryName },
            async function (err, category) {
                if (err) {
                    console.log(err)
                    res.send({ ok: false })
                } else {
                    let categories = await categoriesFind()
                    console.log(categories)
                    res.send({ ok: true, category, categories })
                }
            })
    } catch (e) {
        console.log(e)
    }
})
router.delete('/',checkAdmin, async (req, res) => {
    const { chosenCategoryid } = req.body

    try {
        await Category.findOneAndRemove({ _id: chosenCategoryid },
            async function (err, category) {
                if (err) {
                    res.send({ ok: false })
                } else {
                    let categories = await categoriesFind()
                    console.log(categories)
                    res.send({ ok: true, category, categories })
                }
            })
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

module.exports = router;