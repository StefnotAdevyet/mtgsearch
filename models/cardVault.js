const mongoose = require('mongoose')

const cardVaultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('CardVault', cardVaultSchema)