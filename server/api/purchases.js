const router = require('express').Router()
const { Purchase } = require('../db/models')
module.exports = router

router.get('/user/history/:id', (req, res, next) => {
  Purchase.findAll({
    where:{
      userId: req.params.id,
      ordered: true
    },
    include: [
      { model: User },
      { model: Cheese }
    ]
  })
    .then(purchases => res.json(purchases))
    .catch(next)
})

router.get('/user/cart/:id', (req, res, next) => {
  Purchase.findAll({
    where: {
      userId: req.params.id,
      ordered: false
    },
    include: [
      { model: User },
      { model: Cheese }
    ]
  })
    .then(purchases => res.json(purchases))
    .catch(next)
})

// posting purchase doesnt delete cart automatically

router.post('/', (req, res, next) => {
  Purchase.create(req.body)
    .then(purchases => res.json(purchases))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Purchase.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(order => {
      res.json(order)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Purchase.findAll({
    include: [
      { model: User },
      { model: Cheese }
    ]
  })
    .then(purchases => res.json(purchases))
    .catch(next)
})
