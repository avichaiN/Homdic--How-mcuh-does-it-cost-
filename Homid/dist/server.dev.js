"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

require("dotenv").config(); // Connection to DB


mongoose.connect("mongodb+srv://" + process.env.USERNAME + ":" + process.env.PASSWORD + "@cluster0.7lig6.mongodb.net/homdic", {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
}); // Routes

var authRouter = require("./routers/authRoute");

var categoryRouter = require("./routers/categoryRoute");

var searchRouter = require("./routers/searchRoute");

var adminRouter = require("./routers/adminRoute");

var updateUserDataRouter = require("./routers/updateUserDataRoute");

var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"]("public"));
app.use("/", authRouter);
app.use("/category", categoryRouter);
app.use("/search", searchRouter);
app.use("/admin", adminRouter);
app.use("/updateUserData", updateUserDataRouter);
app.listen(port, function () {
  return console.log("server now running on port: ".concat(port));
});