const { request, response } = require("express");
const db = require("../models")
const book = db.book;
const Review = require("../models/review.model")


exports.addReview = async (req, res) => {
  try {
    const bookId = req.params.id;

    const isBookFound = await book.findById(bookId);
    if (!isBookFound) {
      return res.status(404).send({ message: "Book not found" });
    }

    const review = new Review({
      book: bookId,
      rating: req.body.rating,
      comment: req.body.comment
    });

    const savedReview = await review.save();
    res.status(200).json(savedReview);
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).send({ message: "Failed to add review", error: err.message });
  }
};


exports.getAllReview = async (req, res) => {
  try {
    const data = await Review.find().populate("bookId", "title author genre");
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: "Error in getting reviews",
      error: error.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Review ID is required" });
    }

    const data = await Review.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).send({ message: "Review not found" });
    }
    res.status(200).send({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).send({
      message: "Error deleting the review",
      error: error.message
    });
  }
};


exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;  
    const { reviewer, rating, comment } = req.body;


    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { reviewer, rating, comment },
      { new: true, runValidators: true } 
    );

    if (!updatedReview) {
      return res.status(404).send({ message: "Review not found" });
    }

    res.send(updatedReview);
  } catch (err) {
    res.status(500).send({
      message: "Failed to update review",
      error: err.message
    });
  }
};
