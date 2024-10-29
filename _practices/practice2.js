const mongoose = require("../db");

const Cat = mongoose.model("Cat", {
  name: String,
});

// 데이터를 여러개 넣기
// insertMany (<배열>)
// insertMay ({데이터 내용})
Cat.insertMany([{ name: "나비" }, { name: "부엉이" }]).then((data) => {
  console.log("저장 완료", data);
});

Cat.find({ name: "야옹이" }).then((data) => {
  console.log(data);
});

Cat.findById("67203452431a14dd5cca64a9").then((data) => {
  console.log(data);
});

Cat.findOne({ name: "핀" }).then((data) => {
  console.log(data);
});

Cat.deleteMany({ name: "야옹이" }).then((data) => {
  console.log(data);
});

Cat.updateOne({ name: "부엉이" }, { name: "mewo" }).then((data) => {
  console.log(data);
});

Cat.updateMany({ name: "부엉이" }, { name: "meow" }).then((data) => {
  console.log(data);
});
