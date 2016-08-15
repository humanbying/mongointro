const mongoose = require('mongoose');

let pizzaSchema = new mongoose.Schema({
  name: String,
  diameter: Number,
  isVegetarian: Boolean
});

let Pizza = mongoose.model('Pizza', pizzaSchema)

module.exports = Pizza;
