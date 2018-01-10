const router = require('express').Router()
const { Cheese } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  //ideaz from coreyz
  const whereObj = {}; 
  if(req.query.category){
    whereObj.category = req.query.category;
  }
  Cheese.findAll({
    where: whereObj
  })
    .then(cheeses => res.json(cheeses))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Cheese.create(req.body)
    .then(cheese => res.json(cheese))
    .catch(next)
})

<<<<<<< HEAD
// router.delete('/:id', (req, res, next) => {
//   Cheese.destroy({
//     where: { id: req.params.id }
//   })
//     .then(r => res.sendStatus(201))
//     .catch(next)
// })

=======
>>>>>>> 459fd4a9be5b538d02bbd3903d852e9ba1db34e3
router.put('/:id', function (req, res, next) {
  Cheese.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(r => {
      res.sendStatus(201)
    })
    .catch(next)
})
