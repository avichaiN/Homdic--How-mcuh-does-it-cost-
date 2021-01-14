For new route on server.js: const *FUNCTION* = require('./routers/ROUTENAME');
app.use('/auth', ROUTENAME);

on /routers/ROUTENAME.js in file put: 
const express = require('express');
const router = express.Router();

router.get('THIS IS LOCALHOST /AUTH/', (req, res) => {
    res.send({ ok: true })
})

module.exports = router;