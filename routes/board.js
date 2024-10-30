const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

router.get("/", async (req, res, next) => {
  try {
    const boardList = await Board.find();
    console.log(req.cookies);

    res.cookie("cookieName", "cookieValue", {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      signed: false,
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
