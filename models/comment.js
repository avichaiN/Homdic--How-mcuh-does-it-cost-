const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const commentSchema = new Schema({

    desc: String,
    price: { type: Number, required: true },
    postId: String,
    fName: String,
    lName: String,
    publishedBy: String,
    createdAt: {
        type: String,
        default: moment().format()
    }
})

module.exports = mongoose.model('Comments', commentSchema);