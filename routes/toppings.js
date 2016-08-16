
var express = require('express');
var router = express.Router();

let Topping = require('../models/topping');

//GET PIZZAS
router.get('/', (req, res) => {
  Topping.find({}, (err, toppings) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(toppings);
    }
    })
  });
router.post('/', (req, res) => {
  Topping.create(req.body, (err, topping) => {
    return res.status(err ? 400 : 200).json(err || topping);
    //this means sending it out explicitly as json
  })
})

router.put('/', (req, res) => {
    Topping.findByIdAndUpdate(req.body._id, req.body, {new: true},
    (err, updateTopping) => {
      if (err || !updateTopping) return res.status(400).send(err || 'Topping not found');
      return res.status(200).json(updateTopping);
    }
  )
})

router.delete('/:id', (req, res) => {
  Topping.findByIdAndRemove(
    req.params.id,
    (err, deletedTopping) => {
      if (err || !deletedTopping) return res.status(400).send(err || 'Topping not found');
      return res.status(200).json(deletedTopping.name + ' was deleted');
    }
  )
})
//   router.get('/:id', (req, res) => {
//     Topping.findById(req.params.id, (err, topping) => {
//       if(err || !topping) {
//         res.status(400).send(err || 'Topping not found.')
//       } else {
//         res.send(topping);
//       }
//     });
//   });
//
//
//   router.post('/', (req, res) => {
//     let topping = new Topping(req.body);
//
//     topping.save((err, savedTopping) => {
//       res.status(err ? 400 : 200).send(err || savedTopping);
//     })
//   });

  module.exports = router;
