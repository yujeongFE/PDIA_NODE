var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("프로디지털 아카데미");
});

module.exports = router;
