const { request, response } = require("express");
const db = require("../models")
const book = db.book;
const Review = require("../models/review.model");

exports.add = async (request, response) => {
    try {
  
        const newBook = new book({
            title: request.body.title,
            author: request.body.author,
            genre: request.body.genre,
            description: request.body.description,
            published: request.body.published
        })
        const data = await newBook.save(newBook);
        response.send(data)
    } catch (err) {
        console.error(err);
    }
};

exports.getBookId = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await book.findById(id);
        if (!data) {
            return response.status(404).send({ message: "Book not found" });
        }
        response.send(data);
    } catch (err) {
        response.status(500).send({ message: "Failed to get the Book ID" });
    }
};

exports.findAll = async (req, res) => {

    try {
        const title = req.query.title;
        const data = await book.find(title)
        res.send(data)
    } catch (err) {
        response.status(404).send({ message: "Failed to get the booK" })
    }
};

const Book = require("../models/book.model"); 

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedBook = await book.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      new: true 
    });

    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.send(updatedBook);
  } catch (err) {
    res.status(500).send({ message: "Failed to update the book" });
  }
};


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



