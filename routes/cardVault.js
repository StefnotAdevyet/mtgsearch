const express = require('express')
const router = express.Router()
const CardVault = require('../models/cardVault')

//get all
router.get('/', async (req, res) => {
  try {
    const cards = await CardVault.find()
    res.json(cards)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
//get one
router.get('/:id', getCard, (req, res) => {
  res.json(res.selected)
})
//create one
router.post('/', async (req, res) => {
  const card = new CardVault({
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
  if (req.body.name !== null) {
    res.selected.name = req.body.name
  }
  if (req.body.color !== null) {
    res.selected.color = req.body.color
  }

})
//delete one
router.delete('/:id', getCard, async (req, res) => {
  try {
    await res.selected.remove()
    res.status(200).json({ message: "Card Deleted"})
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

async function getCard (req, res, next) {
  let selected
  try {
  selected = await CardVault.findById(req.params.id)
  if (selected === null) {
    return res.status(404).json({ message: "Card Not Found" })
  }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.selected = selected
  next()
}

module.exports = router