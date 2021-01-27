const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const jwt = require("jwt-simple");

// Connection to DB
mongoose.connect(`${process.env.DATABASE_URL}`, {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Routes
const authRouter = require("./routers/authRoute");
const categoryRouter = require("./routers/categoryRoute");
const adminRouter = require("./routers/adminRoute");
const updateUserDataRouter = require("./routers/updateUserDataRoute");
const postRouter = require("./routers/postRoute");
const commentsRouter = require("./routers/commentsRoute");
const updateUserPasswordRouter = require("./routers/updateUserPasswordRoute");

//Global Functions
const checkUserTokenLogin = require("./routers/gFunctions/checkUserTokenLogin");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", authRouter);

app.get("/", checkUserTokenLogin, (req, res) => {
  // if fails to go in here (no valid token) goes to index.html-- else- goes to categoy page.
  res.sendFile(path.join(__dirname, "./public", "Categories.html"));
});

app.use("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

app.use("/category", categoryRouter);

app.use("/admin", adminRouter);

app.use("/updateUserData", updateUserDataRouter);

app.use("/posts", postRouter);

app.use("/comments", commentsRouter);

app.use("/resetpassword", updateUserPasswordRouter);

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`server now running on port: ${port}`));
