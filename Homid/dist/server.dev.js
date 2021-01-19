"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var mongoose = require("mongoose"); // Connection to DB


mongoose.connect("mongodb+srv://avichai:123@cluster0.7lig6.mongodb.net/homdic", {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
}); // Routes

var authRouter = require("./routers/authRoute");

var categoryRouter = require("./routers/categoryRoute");

var searchRouter = require("./routers/searchRoute");

var adminRouter = require("./routers/adminRoute"); // Mongoose Schemas


var User = require("./models/user");

var Category = require("./models/category");

var Comment = require("./models/comment");

var Post = require("./models/post");

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
app.use("/admin", adminRouter); //middleware check for user token

var checkUserToken = function checkUserToken(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function checkUserToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.userLoggedIn;

          if (token) {
            decoded = jwt.decode(token, secret);
            req.userInfo = decoded;
            next();
          } else {
            res.send({
              user: "unauthorized"
            });
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

app.listen(port, function () {
  return console.log("server now running on port: ".concat(port));
});