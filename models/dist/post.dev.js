"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var moment = require('moment');

var postSchema = new Schema({
  title: String,
  desc: String,
  img: Buffer,
  categoryId: {
    type: String,
    required: true
  },
  fName: String,
  lName: String,
  publishedBy: String,
  createdAt: {
    type: String,
    "default": moment().format()
  }
});
module.exports = mongoose.model('Posts', postSchema);