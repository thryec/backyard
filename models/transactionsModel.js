const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  seller: {
    type: String,
    required: true,
    unique: true,
  },
  buyer: {
    type: String,
    required: true,
  },
  item: {
    type: mongoose.Types.ObjectId,
    ref: 'Item',
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('User', transactionSchema)
