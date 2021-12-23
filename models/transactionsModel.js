const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  seller: {
    type: String,
    required: true,
  },
  buyer: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: {
      firstName: String,
      lastName: String,
      emailAddress: String,
      country: String,
      streetAddress: String,
      city: String,
      state: String,
      postalCode: Number,
    },
    required: true,
  },
})

module.exports = mongoose.model('Transaction', transactionSchema)
