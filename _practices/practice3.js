const mongoose = require("../db");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    // thumbnail: {
    //    type: String,
    //    unique: true
    // },
    story: {
      type: String,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
    // virtuals
  }
);
// 역참조
MovieSchema.virtual("reviews", {
  ref: "Review", // 역참조할 모델 이름
  localField: "_id", // 현재 ID (Movie의 id)
  foreignField: "movie", // 역참조할 모델에서 Movie를 가리키고 있는 이름.
});

const Movie = mongoose.model("Movie", MovieSchema);
Movie.findOne({ title: "영화2" })
  .populate("reviews")
  .then((movie) => {
    console.log("movie");
    console.log(movie);
    console.log("-".repeat(10));
    console.log(movie.toObject({ virtuals: true }));
  });

const ReviewSchema = new mongoose.Schema({
  writer: {
    type: String,
    required: true,
  },
  movie: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Movie",
  },
  title: {
    type: String,
    required: true,
    validate: function (val) {
      return val.trim() !== "" && val.length > 1;
    },
  },
  content: {
    type: String,
    default: "",
  },
});

//  Review.find({writer:"신윤수"}).then(review=>{
//     console.log(review);
//  })
//  Review.find({writer:"신윤수"}).populate('movie').then(review=>{
//     console.log(review)
//  })

// Movie.create({
//     title: "영화2",
//     director: "신윤수",
//     startDate: "2017-01-18",
//     // thumbnail: "https://an2-img.amz.wtchn.net/image/v2/W-6OOBFuHj6lBaBEfctSjw.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMjV5YW5kaE5uaDFZbWx2WW5kbmJuWjVZM0J3SW4wLlVxRm83bHNuaHU3dzc5aXBIVlYtU2prUFQxY29JYWV2TUdMNDBLaVg5eTQ",
//     story: "비밀리에 제작된 위조 지폐 동판을 탈취하려는 내부 조직에 의해 작전 중 아내와 동료들을 잃게 된 특수 정예부대...",
//     tags: [2017, "액션", "한국"]
//  }).then(data=>{
//     console.log(data);
//  })

//  Movie.find({director: "영화1"})
