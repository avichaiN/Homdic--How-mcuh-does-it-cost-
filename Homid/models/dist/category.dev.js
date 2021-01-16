"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CategorySchema = new Schema({
  Name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  Img: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Categorys', CategorySchema);