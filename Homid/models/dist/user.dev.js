"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "default": "public"
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("users", UserSchema);