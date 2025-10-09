const reviewController = require("../controllers/review.controllers");
const express = require("express");


module.exports = (app) => {

    app.post("/books/review/:id", reviewController.addReview);

    app.get("/books/review", reviewController.getAllReview);

    app.put("/books/review/:id", reviewController.updateReview);

    app.delete("/books/review/:id", reviewController.deleteReview);


}