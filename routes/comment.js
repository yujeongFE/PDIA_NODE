let express = require("express");
let router = express.Router();

let Comment = require("../models/Comment");

// REST API ()
// REpresentational State Transfer : Application Programming Interface

// URL과 Method만 보아도, 무슨 자원에 대한 어떤 요청인지가 잘 나타내면 좋겠다.
/**
 * GET  /board            : 게시글 리스트를 GET
 * POST /board            : 게시글 등록해줘. POST
 * PUT  /board/<boardId>  : boardId에 해당하는 게시글 수정
 * DELETE /board/<boardId>: boardId에 있는 게시글 삭제
 * GET  /board/<boardId>  : boardId에 해당하는 게시글을 GET
 */

/**
 * GET  /comment              : 댓글 리스트를 GET
 * POST /comment              : 댓글을 등록. POST
 * GET /comment/<commentId>   : commentId에 해당하는 댓글을 조회
 * PUT  /comment/<commentId>  : commentId에 해당하는 댓글을 수정
 * DELETE /comment/<commentId>: commentId에 해당하는 댓글을 삭제
 */

/**
 * GET  /board/<boardId>/comment : boardId에 해당하는 게시글의 댓글 조회
 * POST /board/<boardId>/comment : boardId에 해당하는 댓글 등록
 * PUT  /comment/<commentId>     : commentId에 해당하는 댓글 수정
 * DELETE /comment/<commentId>   : commentId에 해당하는 댓글 삭제
 */

router.get("/:boardId/comment", (req, res) => {
  Comment.find({ board: req.params.boardId }).then((boards) => {
    res.json(boards);
  });
});
router.post("/:boardId/comment", (req, res) => {
  console.log("asdfasdf");
  Comment.create({
    board: req.params.boardId,
    content: req.body.content,
    author: req.body.author,
  })
    .then((result) => {
      res.json(result);
    })
    .then((err) => console.log(err));
});

router.put("comment/:id", function (req, res, next) {
  console.log(req.body);
  Board.create(req.body, function (err, board) {
    if (err) return next(err);
    res.json(board);
  });
});

router.put("comment/:id", function (req, res, next) {
  console.log(req.body);
  Board.create(req.body, function (err, board) {
    if (err) return next(err);
    res.json(board);
  });
});
module.exports = router;
