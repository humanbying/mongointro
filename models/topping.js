'use strict';

const mongoose = require('mongoose');

let toppingSchema = new mongoose.Schema({
  name: {type: String, required: true},
  vegetable: {type: Boolean, required: true}
})

let Topping = mongoose.model('Topping', toppingSchema)

module.exports = Topping;
