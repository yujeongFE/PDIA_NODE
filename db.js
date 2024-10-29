require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_HOST = process.env.MONGODB_URI;

if (!MONGO_HOST) {
  throw new Error("MongoDB URI가 정의되지 않았습니다. .env 파일을 확인하세요.");
}

mongoose
  .connect(MONGO_HOST, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
