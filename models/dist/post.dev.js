"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var postSchema = new Schema({
  title: String,
  desc: String,
  img: String,
  categoryId: {
    type: String,
    required: true
  },
  fName: String,
  lName: String,
  publishedBy: String
}, {
  timestamps: true
});
module.exports = mongoose.model('Posts', postSchema);