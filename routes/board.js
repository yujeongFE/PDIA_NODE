let express = require("express");
let router = express.Router();

let Board = require("../models/Board");

router.get("/", function (req, res, next) {
  Board.find(function (err, boards) {
    if (err) return next(err);
    res.json(boards);
  });
});

router.get("/:id", function (req, res, next) {
  Board.findById(req.params.id, function (err, board) {
    if (err) return next(err);
    if (!board) return next(new Error("Board not found")); // 에러 메시지 추가
    res.json(board);
  });
});

router.post("/", async function (req, res, next) {
  try {
    console.log(req.body);
    const board = await Board.create(req.body);
    res.json(board);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
