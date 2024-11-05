/**
 * 1. TodoSchema 만들기
 * 2. 로그인한 유저만 TodoSchema를 작성할 수 있게 만들기 (API 및 라우터 만들기)
 * 3. React에서 로그인 구현하고, TodoList 기능 구현하기
 */

var express = require("express");
var router = express.Router();
const User = require("../models/User");

const { createToken, verifyToken } = require("../utils/auth");

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.signUp(email, password);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const tokenMaxAge = 60 * 60 * 24 * 3;

    const token = createToken(user, tokenMaxAge);

    user.token = token;

    // 1. token을 cookie에 저장하라고 response header에 담아보낸다.
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: tokenMaxAge * 1000,
    });

    console.log(user);
    // 2. token을 response body에 담아보낸다.
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

router.all("/logout", async (req, res, next) => {
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

async function authenticate(req, res, next) {
  let token = req.cookies.authToken;
  let headerToken = req.headers.authorization;
  if (!token && headerToken) {
    token = headerToken.split(" ")[1];
  }

  const user = verifyToken(token);
  req.user = user;

  if (!user) {
    const error = new Error("Authorization Failed");
    error.status = 403;

    next(error);
  }
  next();
}
router.get("/protected", authenticate, async (req, res, next) => {
  console.log(req.user);
  res.json({ data: "민감한 데이터" });
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.session.viewCount) {
    req.session.viewCount += 1;
  } else {
    req.session.viewCount = 1;
  }

  console.log(req.session.viewCount);
  console.log(req.session);
  res.send("respond with a resource");
});

module.exports = router;
