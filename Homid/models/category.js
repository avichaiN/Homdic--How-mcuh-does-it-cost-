const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    Name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    Post: [{
        title: String,
        desc: String,
        img: String,
        category: String,
        comments: [{
            title: String,
            desc: String,
            price: { type: Number, required: true },
            publishedBy: String
        }]
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Categorys', CategorySchema);