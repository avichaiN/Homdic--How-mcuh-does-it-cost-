const express = require('express')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://avichai:123@cluster0.7lig6.mongodb.net/homdic', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true });

const authRouter = require('./routers/auth');
const categoryRouter = require('./routers/category');

const User = require('./models/user');
const Category = require('./models/category');
const Comment = require('./models/comment');
const Post = require('./models/post');

const port = process.env.PORT || 3000
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use(express.static('public'))

app.use('/auth', authRouter);

app.use('/category', categoryRouter);

app.get('*', (req, res) => {
    res.status('404').send({ ok: false })
})

app.listen(port, () => console.log(`server now running on port: ${port}`));