const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    img: Buffer,
    Name: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: String,
    }
})

module.exports = mongoose.model('Categories', CategorySchema);