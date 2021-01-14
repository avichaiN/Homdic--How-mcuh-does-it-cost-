const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    res.send({ ok: false })
})

module.exports = router;