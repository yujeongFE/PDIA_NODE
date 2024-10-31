const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

const BOARD_HISTORY_COOKIE = "board-history";

router.get("/:id", (req, res, next) => {
  // Board.findById(req.param.id).then(board=>{
  Board.findById(req.params.id)
    .then((board) => {
      let boardHistory = req.cookies[BOARD_HISTORY_COOKIE];
      if (boardHistory) {
        boardHistory = JSON.parse(boardHistory);
      } else {
        boardHistory = [];
      }

      console.log(boardHistory);

      boardHistory.push(req.params.id);
      if (boardHistory.length > 3) {
        boardHistory.shift();
      }
      res.cookie(BOARD_HISTORY_COOKIE, JSON.stringify(boardHistory), {
        secure: true,
      });
      res.json(board);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/", async (req, res, next) => {
  try {
    const boardList = await Board.find();
    console.log(req.cookies);

    res.cookie("cookieName", "cookieValue", {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true, // JS 접근 불가 (프론트에서 접근 못하도록)
      secure: false, // Https 프로토콜만 쿠키 사용 가능
      signed: false, // 서명 여부 (HTTPS)
    });

    res.json(boardList);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    if (!req.session.boardPath) {
      req.session.boardPath = [];
    }

    req.session.boardPath.push(board.title);

    if (req.session.boardPath.length > 10) {
      req.session.boardPath.shift();
    }
    console.log(req.session.boardPath);

    res.json(board);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
