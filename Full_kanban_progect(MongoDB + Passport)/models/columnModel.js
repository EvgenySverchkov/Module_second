const mongoose = require("mongoose");

var columnsSchema = mongoose.Schema({
  id: Number,
  title: String
});
module.exports = mongoose.model('column', columnsSchema);