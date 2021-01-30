const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const CategorySchema = new Schema({
    Name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    img:Buffer,
    createdAt: { 
        type: String,
        default: moment().format()
    }
})

module.exports = mongoose.model('Categories', CategorySchema);