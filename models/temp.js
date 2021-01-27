const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tempFileImg = new Schema({
    FileImg:Buffer,  
    FileExtention:String,  
   })

module.exports = mongoose.model('temps', tempFileImg);