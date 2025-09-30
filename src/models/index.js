
const dbConfiguration = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfiguration.url;
db.book = require("./book.model.js")(mongoose)
db.review= require("./review.model.js")(mongoose)

module.exports = db;
