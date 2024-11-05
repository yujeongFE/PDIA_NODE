var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const boardRouter = require("./routes/board");
const birdsRouter = require("./routes/birds");
const commentRouter = require("./routes/comment");

const mongoose = require("./db");
const cors = require("cors");
// localhost:3000

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(logger("dev"));
// app.use(미들웨어 or 라우터)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "<my-secret>",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // https만 가능
    },
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (!req.session.userHistory) {
    req.session.userHistory = [];
  }

  req.session.userHistory.push(req.path);

  // console.log('session:', req.session);
  // console.log("middleware실행!");
  // console.log('path:', req.path);
  console.log(req.session.userHistory);
  next();
});

app.get("/hello-world", (req, res) => {
  console.log(req.headers);
  // console.dir(req);
  res.json({
    title: "HelloWorld",
    data: "blah blah",
  });
  // res.send("HI My Name is younsoo")
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

app.use("/", indexRouter); // http://localhost:3000/
app.use("/users", usersRouter); // http://localhost:3000/users
app.use("/board", boardRouter); // http://localhost:3000/board/~
app.use("/birds", birdsRouter);
app.use("/comment", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json(res.locals);
  // next()
});

// console.log(app._router);

// console.log(mongoose.models)

module.exports = app;
