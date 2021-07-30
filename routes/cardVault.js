const express = require('express')
const router = express.Router()
const cardVault = require('../models/cardVault')

//get all
router.get('/', async (req, res) => {
  try {
    const cards = await cardVault.find()
    res.json(cards)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
//get one
router.get('/:id', (req, res) => {
  res.send(req.params.id)
})
//create one
router.post('/', async (req, res) => {
  const card = new cardVault({
    name: req.body.name,
    color: req.body.color
  })

  try {
    const newCard = await card.save()
    res.status(201).json(newCard)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

})
//update one
router.patch('/:id', (req, res) => {

})
//delete one
router.delete('/:id', (req, res) => {

})

module.exports = router