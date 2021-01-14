const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('loginRegister', {
        title: 'Login',
        description: 'Sign into your account'
    })
})

module.exports = router;