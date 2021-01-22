const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
        title: String,
        desc: String,
        img: String,
        categoryId:{
            type: String,
            required: true
        },
        fName: String,
        lName: String,
        publishedBy: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Posts', postSchema);