const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

    desc: String,
    price: { type: Number, required },
    publishedBy: String,
    postId: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Comments', commentSchema);