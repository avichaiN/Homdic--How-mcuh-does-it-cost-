"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var commentSchema = new Schema({
  desc: String,
  price: {
    type: Number,
    required: true
  },
  publishedBy: String,
  postId: String
}, {
  timestamps: true
});
module.exports = mongoose.model('Comments', commentSchema);