"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

require("dotenv").config();

var path = require("path");

var jwt = require("jwt-simple"); // Connection to DB


mongoose.connect("".concat(process.env.DATABASE_URL), {
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

var postRouter = require("./routers/postRoute"); //Global Functions


var checkUserTokenLogin = require("./routers/gFunctions/checkUserTokenLogin");

var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/", authRouter);
app.get("/", checkUserTokenLogin, function (req, res) {
  // if fails to go in here (no valid token) goes to index.html-- else- goes to categoy page.
  res.sendFile(path.join(__dirname, "./public", "Categories.html"));
});
app.use("/index", function (req, res) {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});
app.use("/category", categoryRouter);
app.use("/search", searchRouter);
app.use("/admin", adminRouter);
app.use("/updateUserData", updateUserDataRouter);
app.use("/post", postRouter);
app.use(express["static"]("public"));
app.listen(port, function () {
  return console.log("server now running on port: ".concat(port));
});