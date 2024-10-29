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
const Review = mongoose.model("Review", ReviewSchema);

Review.create({
  writer: "전유정",
  movie: "67203fc63c39621e71db125d",
  title: "리뷰1",
});

Review.find({ writer: "전유정" }).then((review) => {
  console.log(review);
});
Review.find({ writer: "전유정" })
  .populate("movie")
  .then((review) => {
    console.log(review);
  });

Review.find({writer: "전유정"}).populate('movie').then(review => {
    console.log(review)
})