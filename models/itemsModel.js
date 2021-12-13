const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  listingStartDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  listingEndDate: {
    type: Date,
  },
})

module.exports = mongoose.model('Item', itemSchema)
