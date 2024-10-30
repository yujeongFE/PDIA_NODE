const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");
const mongoose = require("./db");

const app = express();

const cors = require("cors");
let corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// 미들웨어 설정
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 라우터 설정
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const boardRouter = require("./routes/board");
const birdsRouter = require("./routes/birds");
const commentRouter = require("./routes/comment.js");

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/board", boardRouter);
app.use("/birds", birdsRouter);
app.use("/comment", commentRouter);

/* 예제 경로 */
app.get("/hello-world", (req, res) => {
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

// 404 처리
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // 에러 상태와 메시지 전송
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
