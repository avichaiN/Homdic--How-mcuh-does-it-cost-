const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    desc: String,
    img: Buffer,
    categoryId: {
        type: String,
        required: true
    },
    fName: String,
    lName: String,
    publishedBy: String,
    createdAt: {
        type: String,
    }
})

module.exports = mongoose.model('Posts', postSchema);