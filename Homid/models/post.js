const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    Post: {
        title: String,
        desc: String,
        img: String,
        category: String,
        categoryId: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Posts', postSchema);