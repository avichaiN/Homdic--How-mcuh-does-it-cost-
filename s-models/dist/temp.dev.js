"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var tempFileImg = new Schema({
  FileImg: Buffer,
  FileExtention: String
});
module.exports = mongoose.model('temps', tempFileImg);