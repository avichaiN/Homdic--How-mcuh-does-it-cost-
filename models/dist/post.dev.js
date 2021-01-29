"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var postSchema = new Schema({
  title: String,
  desc: String,
  img: Buffer,
  imgName: String,
  categoryId: {
    type: String,
    required: true
  },
  fName: String,
  lName: String,
  publishedBy: String,
  createdAt: {
    type: String
  }
});
module.exports = mongoose.model('Posts', postSchema);