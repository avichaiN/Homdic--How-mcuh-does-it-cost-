const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

    comments: {
        title: String,
        desc: String,
        price: { type: Number, required: true },
        publishedBy: String,
        postId: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Comments', commentSchema);