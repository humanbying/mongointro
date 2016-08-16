
var express = require('express');
var router = express.Router();

let Pizza = require('../models/pizza');

//GET PIZZAS
router.get('/pepperoni', (req, res) => {
  Pizza.findPepperoni((err, pizzas) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(pizzas);
  })
})

router.get('/', (req, res) => {
  Pizza.find({}, (err, pizzas) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(pizzas);
    }
  }).populate('toppings')
  })

router.get('/:name', (req, res) => {
  //statics
  Pizza.findByName(req.params.name, (err, pizzas) =>{
    return res.status(err ? 400 :200).json(err || pizzas)
  })
})

router.post('/', (req, res) => {
  Pizza.create(req.body, (err, pizza) => {
    if (err) return res.status(400).send(err)
    Pizza.findById(pizza._id, (err, pizzaWithToppings) => {

    let isVegetarian = pizzaWithToppings.isVegetarian();

    pizzaWithToppings.vegetarian = isVegetarian;

    pizzaWithToppings.save((err, newPizza) => {
      return res.status(err ? 400 : 200).send(newPizza)
      })
    }).populate('toppings');

  })
})

router.put('/', (req, res) => {
    Pizza.findByIdAndUpdate(req.body._id, req.body, {new: true},
    (err, updatePizza) => {
      if (err || !updatePizza) return res.status(400).send(err || 'Pizza not found');

      updatedPizza.isVegetarian((err, updatedPizzaWithVegetarianKey)=> {
        if (err || !updatePizza) return res.status(200).json(updatedPizzaWithVegetarianKey);
      })

      return res.status(200).json(updatePizzaWithVegetarianKey);
    }
  ).populate('toppings')
})

router.delete('/:id', (req, res) => {
  Pizza.findByIdAndRemove(
    req.params.id,
    (err, deletedPizza) => {
      if (err || !deletedPizza) return res.status(400).send(err || 'Pizza not found');
      return res.status(200).json(deletedPizza.name + ' was deleted');
    }
  )
})
//   router.get('/:id', (req, res) => {
//     Pizza.findById(req.params.id, (err, pizza) => {
//       if(err || !pizza) {
//         res.status(400).send(err || 'Pizza not found.')
//       } else {
//         res.send(pizza);
//       }
//     });
//   });
//
//
//   router.post('/', (req, res) => {
//     let pizza = new Pizza(req.body);
//
//     pizza.save((err, savedPizza) => {
//       res.status(err ? 400 : 200).send(err || savedPizza);
//     })
//   });

  module.exports = router;
