'use strict';

const mongoose = require('mongoose');


let pizzaSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  diameter: {type: Number, min: 10, max: 42, default: 18},
  vegetarian: {type: Boolean},
  toppings: [
    {type: mongoose.Schema.Types.ObjectId, ref: "Topping"}
  ]
});

pizzaSchema.statics.findPepperoni = function(cb) {
    //this = Pizza
    this.find({}, function(err, pizzas) {
      if (err) return cb(err)
      console.log('IN STATIC FIND PEPPERONI', pizzas)
      pizzas = pizzas.filter(pizza => {
        return pizza.toppings.some(topping => topping.name === 'pepperoni' )
      })

      return cb(null, pizzas)

    }).populate('toppings')
}

pizzaSchema.methods.isVegetarian = function(cb) {
  //this = pizza
  this.vegetarian = this.toppings.every(topping => topping.vegetable)
  return this
}

const Pizza = mongoose.model('Pizza', pizzaSchema)

module.exports = Pizza;
