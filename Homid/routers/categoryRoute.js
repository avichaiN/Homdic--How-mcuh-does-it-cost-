const express = require('express');
const Category = require('../models/category');
const router = express.Router();

// get all categories to display on category page.
router.get('/', async (req, res) => {

    try {
        await Category.find({}, (err, categories) => {
            if (err) {
                res.send({ ok: false })
            } else {
                res.send({ categories })
            }
        })
    } catch (e) {
        res.send({ ok: false })
    }
})

//create new category for admin
router.post('/create', async (req, res) => {
    const { newCategory } = req.body
    console.log(newCategory)
    const category = new Category({ Name: newCategory })
    try {
        await category.save()
        res.send({ ok: true })
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

module.exports = router;