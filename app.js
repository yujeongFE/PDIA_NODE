const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");

const app = express();
const indexRouter = require("./routes/index"); // index 라우터 파일 위치
const userRouter = require("./routes/users"); // user 라우터 파일 위치

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/hello-world", (req, res) => {
  res.json({
    title: "HelloWorld",
    data: "blah blah",
  });
});

app.use("/", indexRouter);
app.use("/users", userRouter);

module.exports = app;
