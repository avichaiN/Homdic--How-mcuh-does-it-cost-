const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment'); // require
const postSchema = new Schema({
    title: String,
    desc: String,
    img: Buffer,
    imgName:String,
    categoryId: {
        type: String,
        required: true
    },
    fName: String,
    lName: String,
    publishedBy: String,
    createdAt: {
        type: String,
        default: moment().format(),
    }
})

module.exports = mongoose.model('Posts', postSchema);