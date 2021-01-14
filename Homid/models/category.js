const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    Name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Categorys', CategorySchema);