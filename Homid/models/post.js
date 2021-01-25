const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment');

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
        publishedBy: String,
        createdAt: { 
            type: String,
            default: moment().format()
        }
})

module.exports = mongoose.model('Posts', postSchema);