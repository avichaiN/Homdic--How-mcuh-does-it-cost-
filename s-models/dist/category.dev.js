"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var moment = require('moment');

var CategorySchema = new Schema({
  Name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  Img: {
    type: Buffer,
    required: true
  },
  createdAt: {
    type: String,
    "default": moment().format()
  }
});
module.exports = mongoose.model('Categories', CategorySchema);