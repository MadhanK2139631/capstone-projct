const mongoose= require('mongoose')
module.exports = mongoose =>{
var schema = mongoose.Schema({
    title : String,
    author : String,
    genre : String,
    description : String,
    published : Date,
    review : [reviewSchema]
},
{
    timestamps : true
});
const book = mongoose.model("Books", schema)

return book;

};

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  comment: {
    type: String,
    required: true
  },
});