const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Birds Home Page");
});

router.get("/:birdId", (req, res) => {
  res.send(`Hi I am ${req.params.birdId} 새 입니다.`);
});
module.exports = router;
