const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment'); // require
const commentSchema = new Schema({

    desc: String,
    price: { type: Number, required: true },
    postId: String,
    publishedBy: String,
    likes: [{
        type: String
    }],
    createdAt: { 
        type: String,
        default: moment().format(),
    }
})

module.exports = mongoose.model('Comments', commentSchema);