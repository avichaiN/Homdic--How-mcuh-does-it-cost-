const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Connection to DB
mongoose.connect(
  `${process.env.DATABASE_URL}`,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

// Routes
const authRouter = require("./routers/authRoute");
const categoryRouter = require("./routers/categoryRoute");
const searchRouter = require("./routers/searchRoute");
const adminRouter = require("./routers/adminRoute");
const updateUserDataRouter = require("./routers/updateUserDataRoute");


const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", authRouter);

app.use("/category", categoryRouter);

app.use("/search", searchRouter);

app.use("/admin", adminRouter);

app.use("/updateUserData", updateUserDataRouter);

app.listen(port, () => console.log(`server now running on port: ${port}`));
