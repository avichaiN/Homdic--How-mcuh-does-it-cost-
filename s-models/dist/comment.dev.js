"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var moment = require('moment'); // require


var commentSchema = new Schema({
  desc: String,
  price: {
    type: Number,
    required: true
  },
  postId: String,
  fName: String,
  lName: String,
  publishedBy: String,
  likes: [{
    type: String
  }],
  createdAt: {
    type: String,
    "default": moment().format()
  }
});
module.exports = mongoose.model('Comments', commentSchema);