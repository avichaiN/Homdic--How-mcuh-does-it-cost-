const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

    desc: String,
    price: { type: Number, required: true },
    postId: String,
    fName: String,
    lName: String,
    publishedBy: String,
    likes: [{
        type: String
    }],
    createdAt: { 
        type: String,
        default: new Date(Date.now())
    }
})

module.exports = mongoose.model('Comments', commentSchema);