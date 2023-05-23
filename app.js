const express = require("express");

// creating app
const app = express();

// imports
const colors = require("colors");
const callDb = require("./config/db");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// importing routers
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");

// configure env
require("dotenv").config({
  path: "./config.env",
});

// calling database
callDb();

// middlewares
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);

// routes
// app.get("/", (req, res) => {
//   res.send(`<h1>welcome user </h1>`);
// });

// serve the frontend
app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./frontend/dist/index.html"),
    function (error) {
      res.status(500).send(error);
    }
  );
});

// exporting app
module.exports = app;
