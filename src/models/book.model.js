const mongoose= require('mongoose');
module.exports = mongoose =>{
var schema = mongoose.Schema({
    title : String,
    author : String,
    genre : String,
    description : String,
    published : Date,
},
{
    timestamps : true
});
const book = mongoose.model("Books", schema)

return book;

};
