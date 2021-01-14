const express = require('express');
const Category = require('../models/category');
const router = express.Router();

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