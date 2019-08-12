const mongoose = require("mongoose");

var cardsSchema = mongoose.Schema({
  id: Number,
  title: String,
  columnId: Number
});
module.exports = mongoose.model('card', cardsSchema);