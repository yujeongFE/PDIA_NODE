const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");

const mongoose = require("./db");

const app = express();

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const boardRouter = require("./routes/board");
const birdsRouter = require("./routes/birds");
const commentRouter = require("./routes/comment.js");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* GET home page. */
app.get("/hello-world", function (req, res) {
  res.json({
    title: "Hello World",
    data: "blah blah",
  });
});

app.post("/hello-world", (req, res) => {
  res.send("This is Post Request");
});

app.put("/hello-world", (req, res) => {
  res.send("This is Put Request");
});

app.delete("/hello-world", (req, res) => {
  res.send("This is Delete Request");
});

// 라우터 사용
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/board", boardRouter);
app.use("/birds", birdsRouter);
app.use("/comment", commentRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error;
});

module.exports = app;
