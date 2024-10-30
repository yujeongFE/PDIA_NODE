const mongoose = require("../db");

const personSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  age: Number,
});

const Person = mongoose.model("Person", personSchema);

Person.create({
  name: {
    first: "윤수",
    last: "신",
  },
  age: 50,
});

Person.find({
  age: { $gt: 17, $lt: 66 },
})
  .limit(10)
  .sort({ age: -1 })
  .select({ name: 1, age: 1 })
  .then((data) => {
    console.log(data);
  });
