const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Board Home Page");
});

module.exports = router;
