const mongoose = require("mongoose");
const MONGO_HOST = process.env.MONGO_HOST;
mongoose.connect(MONGO_HOST, {
  retryWrites: true,
  w: "majority",
});
