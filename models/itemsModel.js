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
  image: {
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
  seller: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Listed',
  },
  listingStartDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  listingEndDate: {
    type: Date,
    default: new Date('December 31, 2100 23:59:59'),
  },
})

module.exports = mongoose.model('Item', itemSchema)
