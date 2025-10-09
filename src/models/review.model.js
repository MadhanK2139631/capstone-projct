
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Books", required: true },
  rating: { type: Number, required: true },
  comment: { type: String }
});

module.exports = mongoose.model("Review", reviewSchema);

