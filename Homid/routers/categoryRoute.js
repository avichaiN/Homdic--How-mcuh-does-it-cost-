const express = require('express');
const Category = require('../models/category');


const router = express.Router();

async function categoriesFind() {
    try {
        return Category.find({}).exec()

    } catch (e) {
        console.log(e)
    }
}

// get all categories to display on category page.
router.get('/', async (req, res) => {

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
router.post('/', async (req, res) => {
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
router.put('/', async (req, res) => {
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
router.delete('/', async (req, res) => {
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