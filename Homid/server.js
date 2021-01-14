const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connection to DB
mongoose.connect('mongodb+srv://avichai:123@cluster0.7lig6.mongodb.net/homdic', { useCreateIndex:true, useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true });


// Routes
const authRouter = require('./routers/auth');
const categoryRouter = require('./routers/category');


// Mongoose Schemas
const User = require('./models/user');
const Category = require('./models/category');
const Comment = require('./models/comment');
const Post = require('./models/post');

const port = process.env.PORT || 3000
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/auth', authRouter);

app.use('/category', categoryRouter);

app.get('*', (req, res) => {
    res.status('404').send({ ok: false })
})

app.listen(port, () => console.log(`server now running on port: ${port}`));